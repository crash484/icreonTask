interface StarRatingProps {
  rating: number;
  size?: number;
}

export function StarRating({ rating, size = 14 }: StarRatingProps) {
  const rounded = Math.round(rating);
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={i < rounded ? 'stars-filled' : 'stars-empty'}
          style={{ fontSize: size }}
        >
          ★
        </span>
      ))}
      <span className="rating-num">({rating})</span>
    </span>
  );
}