import { useEffect, useMemo, useState } from "react";
import type { RefObject } from "react";

type ReviewItem = {
  name: string;
  review: string;
  rating?: number;
  relativeTime?: string;
  authorUrl?: string | null;
};

type HomeReviewsProps = {
  sectionRef: RefObject<HTMLElement | null>;
  className?: string;
  reviews: ReviewItem[];
};

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?sca_esv=879950088f824d1a&rlz=1C5GCEM_enIN1130IN1130&sxsrf=ANbL-n4LXDj8kPlA21xD6vlUBbWtkW04QQ:1774943812075&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOTc3M5HYvMEc0Q8d4gk5Uns4EeALN_Xq6mNQLOIR4-v3xHsFnR6MF93SSPLrSjrfiSq-xC1DqBfFVL-GulV8CNeNdqYyUl1FOAGCJEt6KXMec2fYZOmIDAYF0T4ePpxCGg58b7I%3D&q=Alpine+Operations+and+Expeditions+Reviews&sa=X&ved=2ahUKEwiB06j71MmTAxWmTmwGHVsBCkQQ0bkNegQIIhAH&biw=1728&bih=907&dpr=2";

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
  const [cardsPerView, setCardsPerView] = useState(() =>
    typeof window === "undefined" ? 3 : getCardsPerView(window.innerWidth),
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onResize = () => setCardsPerView(getCardsPerView(window.innerWidth));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const maxIndex = useMemo(
    () => Math.max(0, reviews.length - cardsPerView),
    [reviews.length, cardsPerView],
  );

  const clampedIndex = Math.min(activeIndex, maxIndex);
  const canGoPrev = clampedIndex > 0;
  const canGoNext = clampedIndex < maxIndex;
  const translate = (clampedIndex * 100) / cardsPerView;
  const totalPages = Math.max(1, maxIndex + 1);
  const currentPage = Math.min(clampedIndex + 1, totalPages);
  const totalReviews = reviews.length;
  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;

    const totalRating = reviews.reduce(
      (sum, review) => sum + (review.rating ?? 5),
      0,
    );

    return totalRating / reviews.length;
  }, [reviews]);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((part) => part[0]?.toUpperCase())
      .join("")
      .slice(0, 2);

  return (
    <section ref={sectionRef} className={`googleReviews ${className}`.trim()}>
      <div className="reviewsHeader">
        <div className="headerCopy">
          <p className="kicker">Field Notes From The Trail</p>
          <h2>
            Stories from climbers, trekkers, and teams we&apos;ve trained.
          </h2>
          <p className="intro">
            A reflection of Alpine Ops in action—disciplined planning, honest
            coaching, and challenging experiences grounded in a distinctly human
            approach.
          </p>
        </div>

        <div className="headerActions">
          <div className="ratingSummary" aria-label="Average review rating">
            <span className="ratingValue">{averageRating.toFixed(1)}</span>
            <span className="ratingStars" aria-hidden="true">
              {"★".repeat(Math.round(averageRating))}
            </span>
            <span className="ratingCount">
              based on {totalReviews} review{totalReviews === 1 ? "" : "s"}
            </span>
          </div>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noreferrer"
            className="reviewLink"
          >
            Read more reviews
          </a>
          <div className="sliderControls" aria-label="Reviews navigation">
            <button
              type="button"
              className="sliderArrow"
              onClick={() =>
                setActiveIndex((index) =>
                  Math.max(0, Math.min(index, maxIndex) - 1),
                )
              }
              disabled={!canGoPrev}
              aria-label="Previous reviews"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              className="sliderArrow"
              onClick={() =>
                setActiveIndex((index) =>
                  Math.min(maxIndex, Math.min(index, maxIndex) + 1),
                )
              }
              disabled={!canGoNext}
              aria-label="Next reviews"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>

      <div className="sliderViewport">
        <div
          className="reviewsTrack"
          style={{ transform: `translateX(-${translate}%)` }}
        >
          {reviews.map((item, index) => (
            <article
              key={`${item.name}-${index}`}
              className="reviewCard"
              style={{ flex: `0 0 ${100 / cardsPerView}%` }}
            >
              <div className="cardAccent" aria-hidden="true" />
              <div className="reviewTop">
                <div className="avatar">{getInitials(item.name)}</div>
                <div className="reviewMeta">
                  <p className="reviewAuthor">{item.name}</p>
                  <div className="reviewSubMeta">
                    <p
                      className="reviewStars"
                      aria-label={`${item.rating ?? 5} star review`}
                    >
                      {"★".repeat(item.rating ?? 5)}
                    </p>
                    {item.relativeTime ? (
                      <p className="reviewTime">{item.relativeTime}</p>
                    ) : null}
                  </div>
                </div>
                <p className="quoteMark" aria-hidden="true">
                  ❝
                </p>
              </div>
              <p className="reviewCopy">{item.review}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mobileDots" aria-hidden="true">
        {Array.from({ length: totalPages }).map((_, index) => (
          <span
            key={index}
            className={`dot ${index === clampedIndex ? "dotActive" : ""}`.trim()}
          />
        ))}
      </div>
    </section>
  );
};

export default HomeReviews;
