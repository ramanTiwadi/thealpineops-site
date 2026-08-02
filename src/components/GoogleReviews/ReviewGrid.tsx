import { useEffect, useMemo, useState } from "react";
import type { CSSProperties, RefObject } from "react";
import { useGoogleReviews } from "../../hooks/useGoogleReviews";
import ReviewCard from "./ReviewCard";
import StarRating from "./StarRating";

type ReviewGridProps = {
  sectionRef?: RefObject<HTMLElement | null>;
  className?: string;
};

const getCardsPerView = (width: number) => {
  if (width >= 1100) return 3;
  if (width >= 720) return 2;
  return 1;
};

const SkeletonGrid = () => (
  <div className="googleReviewsGrid" aria-label="Loading Google reviews">
    {Array.from({ length: 3 }).map((_, index) => (
      <article className="googleReviewCard googleReviewSkeleton" key={index}>
        <div className="skeletonHeader">
          <span className="skeletonAvatar" />
          <span className="skeletonLines">
            <span />
            <span />
          </span>
        </div>
        <span className="skeletonParagraph" />
        <span className="skeletonParagraph short" />
      </article>
    ))}
  </div>
);

const ReviewGrid = ({ sectionRef, className = "" }: ReviewGridProps) => {
  const { data, error, isLoading, retry } = useGoogleReviews();
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(() =>
    typeof window === "undefined" ? 3 : getCardsPerView(window.innerWidth),
  );
  const sectionClassName = `googleReviewsLive ${className}`.trim();
  const reviews = data?.reviews ?? [];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onResize = () => setCardsPerView(getCardsPerView(window.innerWidth));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const maxIndex = useMemo(
    () => Math.max(0, reviews.length - cardsPerView),
    [cardsPerView, reviews.length],
  );
  const clampedIndex = Math.min(activeIndex, maxIndex);
  const canGoPrevious = clampedIndex > 0;
  const canGoNext = clampedIndex < maxIndex;
  const totalPositions = maxIndex + 1;

  return (
    <section ref={sectionRef} className={sectionClassName}>
      <div className="googleReviewsHeader">
        <div>
          <p className="googleReviewsKicker">Featured Google Reviews</p>
          <h2>Trusted by people who train and travel with us.</h2>
          <p className="googleReviewsIntro">
            A selection of recent Google feedback from people who have trained,
            trekked, and explored with Alpine Ops.
          </p>
        </div>

        <div className="googleReviewsPanel">
          <div className="googleReviewsSummary">
            <div className="summaryRating">
              <span>{data?.rating?.toFixed(1) ?? "5.0"}</span>
              <StarRating
                rating={data?.rating ?? 5}
                label="Average Google rating"
              />
            </div>
            <p>
              {data?.userRatingCount
                ? `From ${data.userRatingCount} Google reviews`
                : "Recent Google reviews"}
            </p>
            {data?.googleMapsUrl ? (
              <a
                href={data.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View all on Google
              </a>
            ) : null}
          </div>

          {!isLoading && !error && reviews.length > cardsPerView ? (
            <div className="googleReviewsControls" aria-label="Review controls">
              <button
                type="button"
                onClick={() => setActiveIndex(Math.max(0, clampedIndex - 1))}
                disabled={!canGoPrevious}
                aria-label="Show previous Google reviews"
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveIndex(Math.min(maxIndex, clampedIndex + 1))}
                disabled={!canGoNext}
                aria-label="Show next Google reviews"
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {isLoading ? <SkeletonGrid /> : null}

      {!isLoading && error ? (
        <div className="googleReviewsError" role="status">
          <p>Google reviews could not be loaded right now.</p>
          <button type="button" onClick={retry}>
            Retry
          </button>
        </div>
      ) : null}

      {!isLoading && !error && data ? (
        <>
          {data.stale ? (
            <p className="googleReviewsStale">
              Showing cached reviews while Google refreshes.
            </p>
          ) : null}
          <div
            className="googleReviewsCarousel"
            style={
              {
                "--cards-per-view": cardsPerView,
                "--active-index": clampedIndex,
              } as CSSProperties
            }
          >
            <div className="googleReviewsViewport">
              <div className="googleReviewsTrack">
                {reviews.map((review) => (
                  <div className="googleReviewSlide" key={review.id}>
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>
            </div>
            {reviews.length > cardsPerView ? (
              <div className="googleReviewsDots" aria-hidden="true">
                {Array.from({ length: totalPositions }).map((_, index) => (
                  <span
                    key={index}
                    className={
                      index === clampedIndex
                        ? "googleReviewsDot dotActive"
                        : "googleReviewsDot"
                    }
                  />
                ))}
              </div>
            ) : null}
          </div>
        </>
      ) : null}
    </section>
  );
};

export default ReviewGrid;
