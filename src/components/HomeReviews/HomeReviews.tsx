import { useEffect, useMemo, useState } from "react";
import type { RefObject } from "react";
import styles from "./HomeReviews.module.scss";

type ReviewItem = {
  name: string;
  review: string;
  rating?: number;
  relativeTime?: string;
  authorUrl?: string | null;
};

type GoogleReviewsResponse = {
  source?: string;
  name?: string;
  rating?: number | null;
  totalReviews?: number;
  googleUrl?: string | null;
  reviews?: ReviewItem[];
};

type HomeReviewsProps = {
  sectionRef: RefObject<HTMLElement | null>;
  className?: string;
  reviews: ReviewItem[];
};

const getCardsPerView = (width: number) => {
  if (width >= 1200) return 3;
  if (width >= 768) return 2;
  return 1;
};

const HomeReviews = ({
  sectionRef,
  className = "",
  reviews,
}: HomeReviewsProps) => {
  const [remoteReviews, setRemoteReviews] = useState<ReviewItem[] | null>(null);
  const [googleUrl, setGoogleUrl] = useState<string | null>(null);
  const [cardsPerView, setCardsPerView] = useState(() =>
    typeof window === "undefined" ? 3 : getCardsPerView(window.innerWidth),
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const endpoint = import.meta.env.VITE_GOOGLE_REVIEWS_API_URL;
    if (!endpoint) return;

    let cancelled = false;

    const loadReviews = async () => {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) return;

        const data = (await response.json()) as GoogleReviewsResponse;
        if (cancelled) return;

        if (Array.isArray(data.reviews) && data.reviews.length > 0) {
          setRemoteReviews(data.reviews);
        }

        if (data.googleUrl) {
          setGoogleUrl(data.googleUrl);
        }
      } catch {
        // Fall back to bundled reviews when the worker is unavailable.
      }
    };

    void loadReviews();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onResize = () => setCardsPerView(getCardsPerView(window.innerWidth));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const displayReviews = remoteReviews?.length ? remoteReviews : reviews;

  const maxIndex = useMemo(
    () => Math.max(0, displayReviews.length - cardsPerView),
    [displayReviews.length, cardsPerView],
  );

  const clampedIndex = Math.min(activeIndex, maxIndex);
  const canGoPrev = clampedIndex > 0;
  const canGoNext = clampedIndex < maxIndex;
  const translate = (clampedIndex * 100) / cardsPerView;

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((part) => part[0]?.toUpperCase())
      .join("")
      .slice(0, 2);

  return (
    <section
      ref={sectionRef}
      className={`${styles.googleReviews} ${className}`.trim()}
    >
      <div className={styles.reviewsHeader}>
        <h2>What Our Clients Say About Us</h2>
        <div className={styles.headerActions}>
          <a
            href={
              googleUrl ??
              "https://www.google.com/search?sca_esv=879950088f824d1a&rlz=1C5GCEM_enIN1130IN1130&sxsrf=ANbL-n4LXDj8kPlA21xD6vlUBbWtkW04QQ:1774943812075&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOTc3M5HYvMEc0Q8d4gk5Uns4EeALN_Xq6mNQLOIR4-v3xHsFnR6MF93SSPLrSjrfiSq-xC1DqBfFVL-GulV8CNeNdqYyUl1FOAGCJEt6KXMec2fYZOmIDAYF0T4ePpxCGg58b7I%3D&q=Alpine+Operations+and+Expeditions+Reviews&sa=X&ved=2ahUKEwiB06j71MmTAxWmTmwGHVsBCkQQ0bkNegQIIhAH&biw=1728&bih=907&dpr=2"
            }
            target="_blank"
            rel="noreferrer"
          >
            View on Google
          </a>
          <div
            className={styles.sliderControls}
            aria-label="Reviews navigation"
          >
            <button
              type="button"
              className={styles.sliderArrow}
              onClick={() =>
                setActiveIndex((index) =>
                  Math.max(0, Math.min(index, maxIndex) - 1),
                )
              }
              disabled={!canGoPrev}
              aria-label="Previous reviews"
            >
              ←
            </button>
            <button
              type="button"
              className={styles.sliderArrow}
              onClick={() =>
                setActiveIndex((index) =>
                  Math.min(maxIndex, Math.min(index, maxIndex) + 1),
                )
              }
              disabled={!canGoNext}
              aria-label="Next reviews"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div className={styles.sliderViewport}>
        <div
          className={styles.reviewsTrack}
          style={{ transform: `translateX(-${translate}%)` }}
        >
          {displayReviews.map((item, index) => (
            <article
              key={`${item.name}-${index}`}
              className={styles.reviewCard}
              style={{ flexBasis: `${100 / cardsPerView}%` }}
            >
              <div className={styles.reviewTop}>
                <div className={styles.avatar}>{getInitials(item.name)}</div>
                <div className={styles.reviewMeta}>
                  <p className={styles.reviewAuthor}>{item.name}</p>
                  <div className={styles.reviewSubMeta}>
                    <p
                      className={styles.reviewStars}
                      aria-label={`${item.rating ?? 5} star review`}
                    >
                      {"★".repeat(item.rating ?? 5)}
                    </p>
                    {item.relativeTime ? (
                      <p className={styles.reviewTime}>{item.relativeTime}</p>
                    ) : null}
                  </div>
                </div>
                <p className={styles.quoteMark} aria-hidden="true">
                  ❝
                </p>
              </div>
              <p className={styles.reviewCopy}>{item.review}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeReviews;
