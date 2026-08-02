import { useCallback, useEffect, useState } from "react";

export type GoogleReview = {
  id: string;
  authorName: string;
  authorUrl: string | null;
  profilePhotoUrl: string | null;
  rating: number;
  text: string;
  publishTime: string | null;
  relativePublishTime: string | null;
};

export type GoogleReviewsResponse = {
  placeId: string;
  placeName: string;
  rating: number | null;
  userRatingCount: number | null;
  googleMapsUrl: string | null;
  reviews: GoogleReview[];
  fetchedAt: string;
  expiresAt: string;
  stale: boolean;
  warning?: string;
};

type UseGoogleReviewsState = {
  data: GoogleReviewsResponse | null;
  error: string | null;
  isLoading: boolean;
  retry: () => void;
};

const DEFAULT_REVIEWS_ENDPOINT = "https://reviews.thealpineops.com/reviews";

const getReviewsEndpoint = () =>
  import.meta.env.VITE_GOOGLE_REVIEWS_ENDPOINT || DEFAULT_REVIEWS_ENDPOINT;

export const useGoogleReviews = (): UseGoogleReviewsState => {
  const [data, setData] = useState<GoogleReviewsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [requestVersion, setRequestVersion] = useState(0);

  const retry = useCallback(() => {
    setRequestVersion((version) => version + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const loadReviews = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(getReviewsEndpoint(), {
          signal: controller.signal,
          headers: {
            Accept: "application/json"
          }
        });

        if (!response.ok) {
          throw new Error(`Reviews request failed with ${response.status}`);
        }

        const payload = (await response.json()) as GoogleReviewsResponse;
        setData(payload);
      } catch (fetchError) {
        if (controller.signal.aborted) return;

        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Unable to load Google reviews.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadReviews();

    return () => controller.abort();
  }, [requestVersion]);

  return {
    data,
    error,
    isLoading,
    retry
  };
};
