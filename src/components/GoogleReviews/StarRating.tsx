type StarRatingProps = {
  rating: number;
  label?: string;
};

const StarRating = ({ rating, label }: StarRatingProps) => {
  const roundedRating = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <div
      className="googleStarRating"
      aria-label={label ?? `${roundedRating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={index < roundedRating ? "starFilled" : "starEmpty"}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
