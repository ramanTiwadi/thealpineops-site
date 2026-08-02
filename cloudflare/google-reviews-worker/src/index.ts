type Env = {
  REVIEWS_CACHE: KVNamespace;
  GOOGLE_PLACES_API_KEY: string;
  GOOGLE_PLACE_ID: string;
};

type GoogleLocalizedText = {
  text?: string;
  languageCode?: string;
};

type GoogleReview = {
  name?: string;
  rating?: number;
  text?: GoogleLocalizedText;
  publishTime?: string;
  relativePublishTimeDescription?: string;
  authorAttribution?: {
    displayName?: string;
    uri?: string;
    photoUri?: string;
  };
};

type GooglePlaceDetails = {
  id?: string;
  displayName?: GoogleLocalizedText;
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: GoogleReview[];
};

type Review = {
  id: string;
  authorName: string;
  authorUrl: string | null;
  profilePhotoUrl: string | null;
  rating: number;
  text: string;
  publishTime: string | null;
  relativePublishTime: string | null;
};

type ReviewsPayload = {
  placeId: string;
  placeName: string;
  rating: number | null;
  userRatingCount: number | null;
  googleMapsUrl: string | null;
  reviews: Review[];
  fetchedAt: string;
  expiresAt: string;
  stale: boolean;
};

const ALLOWED_ORIGINS = new Set([
  "https://thealpineops.com",
  "http://localhost:5173",
  "http://127.0.0.1:5173"
]);
const CACHE_KEY = "google-place-reviews:v1";
const FRESH_FOR_SECONDS = 60 * 60 * 12;
const KEEP_STALE_FOR_SECONDS = 60 * 60 * 24 * 7;
const FIELD_MASK = [
  "id",
  "displayName",
  "rating",
  "userRatingCount",
  "googleMapsUri",
  "reviews.name",
  "reviews.rating",
  "reviews.text",
  "reviews.publishTime",
  "reviews.relativePublishTimeDescription",
  "reviews.authorAttribution"
].join(",");

const jsonHeaders = (origin: string | null) => {
  const headers = new Headers({
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "public, max-age=300"
  });

  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Vary", "Origin");
  }

  return headers;
};

const preflightHeaders = (origin: string | null) => {
  const headers = new Headers();

  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type");
    headers.set("Access-Control-Max-Age", "86400");
    headers.set("Vary", "Origin");
  }

  return headers;
};

const jsonResponse = (
  origin: string | null,
  body: unknown,
  status = 200
) =>
  new Response(JSON.stringify(body, null, 2), {
    status,
    headers: jsonHeaders(origin)
  });

const isCacheFresh = (payload: ReviewsPayload) =>
  new Date(payload.expiresAt).getTime() > Date.now();

const readCache = async (env: Env) =>
  env.REVIEWS_CACHE.get<ReviewsPayload>(CACHE_KEY, "json");

const normalizeReviews = (
  placeId: string,
  place: GooglePlaceDetails
): ReviewsPayload => {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + FRESH_FOR_SECONDS * 1000);

  return {
    placeId,
    placeName: place.displayName?.text ?? "Alpine Ops",
    rating: typeof place.rating === "number" ? place.rating : null,
    userRatingCount:
      typeof place.userRatingCount === "number" ? place.userRatingCount : null,
    googleMapsUrl: place.googleMapsUri ?? null,
    reviews: (place.reviews ?? [])
      .filter((review) => review.text?.text)
      .map((review, index) => ({
        id: review.name ?? `${placeId}-${index}`,
        authorName: review.authorAttribution?.displayName ?? "Google reviewer",
        authorUrl: review.authorAttribution?.uri ?? null,
        profilePhotoUrl: review.authorAttribution?.photoUri ?? null,
        rating: Math.max(1, Math.min(5, Math.round(review.rating ?? 5))),
        text: review.text?.text ?? "",
        publishTime: review.publishTime ?? null,
        relativePublishTime: review.relativePublishTimeDescription ?? null
      })),
    fetchedAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
    stale: false
  };
};

const fetchGoogleReviews = async (env: Env) => {
  const url = new URL(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(
      env.GOOGLE_PLACE_ID
    )}`
  );
  url.searchParams.set("languageCode", "en");

  const response = await fetch(url.toString(), {
    headers: {
      "X-Goog-Api-Key": env.GOOGLE_PLACES_API_KEY,
      "X-Goog-FieldMask": FIELD_MASK
    }
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Google Places API failed: ${response.status} ${message}`);
  }

  const place = (await response.json()) as GooglePlaceDetails;
  return normalizeReviews(env.GOOGLE_PLACE_ID, place);
};

const writeCache = async (env: Env, payload: ReviewsPayload) =>
  env.REVIEWS_CACHE.put(CACHE_KEY, JSON.stringify(payload), {
    expirationTtl: KEEP_STALE_FOR_SECONDS
  });

const handleReviews = async (request: Request, env: Env) => {
  const origin = request.headers.get("Origin");
  const cached = await readCache(env);

  if (cached && isCacheFresh(cached)) {
    return jsonResponse(origin, cached);
  }

  try {
    const freshPayload = await fetchGoogleReviews(env);
    await writeCache(env, freshPayload);
    return jsonResponse(origin, freshPayload);
  } catch (error) {
    console.error("Unable to refresh Google reviews.", error);

    if (cached) {
      return jsonResponse(origin, {
        ...cached,
        stale: true,
        warning:
          error instanceof Error
            ? error.message
            : "Google Places API failed; returned stale cache."
      });
    }

    return jsonResponse(
      origin,
      {
        error:
          "Reviews are temporarily unavailable and no cached copy exists yet."
      },
      502
    );
  }
};

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: origin && ALLOWED_ORIGINS.has(origin) ? 204 : 403,
        headers: preflightHeaders(origin)
      });
    }

    if (request.method !== "GET") {
      return jsonResponse(origin, { error: "Method not allowed." }, 405);
    }

    if (url.pathname !== "/" && url.pathname !== "/reviews") {
      return jsonResponse(origin, { error: "Not found." }, 404);
    }

    return handleReviews(request, env);
  }
};
