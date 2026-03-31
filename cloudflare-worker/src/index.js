const CACHE_TTL_SECONDS = 60 * 60 * 6;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders() });
    }

    if (url.pathname !== "/reviews") {
      return json({ error: "Not found" }, 404);
    }

    const cache = caches.default;
    const cacheKey = new Request(url.toString(), request);
    const cached = await cache.match(cacheKey);

    if (cached) {
      return withCors(cached);
    }

    const placeId = env.GOOGLE_PLACE_ID;
    const apiKey = env.GOOGLE_API_KEY;

    if (!placeId || !apiKey) {
      return json(
        { error: "Missing GOOGLE_PLACE_ID or GOOGLE_API_KEY" },
        500,
      );
    }

    const googleUrl =
      "https://maps.googleapis.com/maps/api/place/details/json" +
      `?place_id=${encodeURIComponent(placeId)}` +
      "&fields=name,rating,reviews,url,user_ratings_total" +
      `&key=${encodeURIComponent(apiKey)}`;

    const response = await fetch(googleUrl, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return json(
        { error: "Google Places API request failed", status: response.status },
        502,
      );
    }

    const data = await response.json();

    if (data.status !== "OK" || !data.result) {
      return json(
        {
          error: "Google Places API returned an error",
          status: data.status,
          details: data.error_message ?? null,
        },
        502,
      );
    }

    const payload = {
      source: "google",
      name: data.result.name ?? "",
      rating: data.result.rating ?? null,
      totalReviews: data.result.user_ratings_total ?? 0,
      googleUrl: data.result.url ?? null,
      reviews: (data.result.reviews ?? []).map((review) => ({
        name: review.author_name ?? "Google reviewer",
        review: review.text ?? "",
        rating: review.rating ?? 5,
        relativeTime: review.relative_time_description ?? "",
        authorUrl: review.author_url ?? null,
        profilePhotoUrl: review.profile_photo_url ?? null,
      })),
    };

    const outbound = json(payload, 200, {
      "Cache-Control": `public, max-age=${CACHE_TTL_SECONDS}`,
    });

    ctx.waitUntil(cache.put(cacheKey, outbound.clone()));

    return outbound;
  },
};

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(),
      ...extraHeaders,
    },
  });
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function withCors(response) {
  const headers = new Headers(response.headers);
  Object.entries(corsHeaders()).forEach(([key, value]) => {
    headers.set(key, value);
  });

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
