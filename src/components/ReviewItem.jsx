import formatDate from "../utils/formatDate";
import Rating from "./Rating";
import useTranslate from "../hooks/useTranslate.js";

const ReviewItem = ({ item, onDelete, onEdit }) => {
  const { title, imgUrl, rating, createdAt, content, id } = item;
  const translate = useTranslate();

  const handleDeleteClick = () => {
    onDelete(id);
  };

  const handleEditClick = () => {
    onEdit(id);
  };

  return (
    <li className="ReviewListItem">
      <img className="ReviewListItem-img" src={imgUrl} alt={title} />
      <div className="desc">
        <h2 className="title">{title}</h2>
        <Rating value={rating} />
        <span className="date">{formatDate(createdAt)}</span>
        <p className="content">{content}</p>
        <button onClick={handleEditClick}>{translate("edit button")}</button>
        <button onClick={handleDeleteClick}>
          {translate("delete button")}
        </button>
      </div>
    </li>
  );
};

export default ReviewItem;
