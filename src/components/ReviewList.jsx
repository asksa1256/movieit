import { useState } from "react";
import ReviewItem from "./ReviewItem";
import "./ReviewList.css";
import ReviewForm from "./ReviewForm";

const ReviewList = ({ items, onDelete }) => {
  const [editingId, setEditingId] = useState(null);

  const handleCancel = () => setEditingId(null);

  return (
    <ul>
      {items.map((item) => {
        if (item.id === editingId) {
          const { title, rating, content, imgUrl } = item;
          const initialValues = { title, rating, content };
          return (
            <li key={item.id}>
              <ReviewForm
                initialValues={initialValues}
                initialPreview={imgUrl}
                onCancel={handleCancel}
              />
            </li>
          );
        }
        return (
          <ReviewItem
            key={item.id}
            item={item}
            onDelete={onDelete}
            onEdit={setEditingId}
          />
        );
      })}
    </ul>
  );
};

export default ReviewList;
