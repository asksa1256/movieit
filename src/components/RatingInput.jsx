import { useState } from "react";
import Rating from "./Rating";
import "./RatingInput.css";

const RatingInput = ({ name, value, onChange }) => {
  const [rating, setRating] = useState(value);

  const handleSelect = (nextValue) => onChange(name, nextValue); // 별 모양이 클릭될 때마다 해당 rating value로 상태 변경 (부모 컴포넌트 'ReviewForm'의 values.rating)

  const handleMouseOut = () => setRating(value); // mouseout하면 다시 원래 받아온 value값으로 rating value 되돌리기

  return (
    <Rating
      className="RatingInput"
      value={rating}
      onSelect={handleSelect}
      onHover={setRating} // onHover: 별점에 hover시 3점 위치면 3점까지, 5점 위치면 5점까지 별점 색을 변경하기 위해 setRating으로 rating 상태 변경.
      onMouseOut={handleMouseOut}
    />
  );
};

export default RatingInput;
