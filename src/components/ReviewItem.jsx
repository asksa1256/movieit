import { useContext } from "react";
import formatDate from "../utils/formatDate";
import Rating from "./Rating";
import LocaleContext from "../contexts/LocaleContext";

const ReviewItem = ({ item, onDelete, onEdit }) => {
  const { title, imgUrl, rating, createdAt, content, id } = item;
  const locale = useContext(LocaleContext);

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
        <p>사용 언어: {locale}</p>
        <button onClick={handleEditClick}>수정</button>
        <button onClick={handleDeleteClick}>삭제</button>
      </div>
    </li>
  );
};

export default ReviewItem;
