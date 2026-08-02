import type { GoogleReview } from "../../hooks/useGoogleReviews";
import StarRating from "./StarRating";

type ReviewCardProps = {
  review: GoogleReview;
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase())
    .join("")
    .slice(0, 2) || "GO";

const ReviewCard = ({ review }: ReviewCardProps) => (
  <article className="googleReviewCard">
    <div className="googleReviewTop">
      {review.profilePhotoUrl ? (
        <img
          className="googleReviewAvatar"
          src={review.profilePhotoUrl}
          alt=""
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="googleReviewAvatar googleReviewInitials">
          {getInitials(review.authorName)}
        </div>
      )}

      <div className="googleReviewAuthorBlock">
        {review.authorUrl ? (
          <a
            className="googleReviewAuthor"
            href={review.authorUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {review.authorName}
          </a>
        ) : (
          <p className="googleReviewAuthor">{review.authorName}</p>
        )}
        <div className="googleReviewMeta">
          <StarRating rating={review.rating} />
          {review.relativePublishTime ? (
            <span>{review.relativePublishTime}</span>
          ) : null}
        </div>
      </div>
    </div>

    <p className="googleReviewText">{review.text}</p>
  </article>
);

export default ReviewCard;
