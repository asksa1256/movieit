import "./Rating.css";

const RATINGS = [1, 2, 3, 4, 5];

function Star({ selected = false, rating, onSelect, onHover }) {
  const className = `Rating-star ${selected ? "selected" : ""}`;

  const handleClick = onSelect ? () => onSelect(rating) : undefined; // 별점을 선택하는 컴포넌트에서는 onSelect가 있으므로 onSelect에 rating 인자 전달 : 별점 선택 없이 보여주기만 하는 컴포넌트에서는 undefined로 handleClick 비활성화.
  const handleMouseOver = onHover ? () => onHover(rating) : undefined;

  return (
    <span
      className={className}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
    >
      ★
    </span>
  );
}

export default function Rating({
  value = 0,
  onSelect,
  onHover,
  onMouseOut,
  className,
}) {
  return (
    <div onMouseOut={onMouseOut} className={className}>
      {RATINGS.map((rating) => (
        <Star
          key={rating}
          selected={value >= rating}
          rating={rating}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}
    </div>
  );
}
