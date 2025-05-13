import formatDate from "../utils/formatDate";
import Rating from "./Rating";

const ReviewItem = ({ item, onDelete }) => {
  const { title, imgUrl, rating, createdAt, content, id } = item;

  const handleDeleteClick = () => {
    onDelete(id);
  };

  return (
    <li className="ReviewListItem" key={id}>
      <img className="ReviewListItem-img" src={imgUrl} alt={title} />
      <div className="desc">
        <h2 className="title">{title}</h2>
        <Rating value={rating} />
        <span className="date">{formatDate(createdAt)}</span>
        <p className="content">{content}</p>
        <button onClick={handleDeleteClick}>삭제</button>
      </div>
    </li>
  );
};

export default ReviewItem;
