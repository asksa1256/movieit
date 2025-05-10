import ReviewItem from "./ReviewItem";
import "./ReviewList.css";

const ReviewList = ({ items, onDelete }) => {
  return (
    <ul>
      {items.map((item) => (
        <ReviewItem item={item} key={item.id} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default ReviewList;
