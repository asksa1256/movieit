import { useState } from "react";
import ReviewItem from "./ReviewItem";
import "./ReviewList.css";
import ReviewForm from "./ReviewForm";

const ReviewList = ({ items, onDelete, onUpdate, onUpdateSuccess }) => {
  const [editingId, setEditingId] = useState(null);

  const handleCancel = () => setEditingId(null);

  return (
    <ul>
      {items.map((item) => {
        if (item.id === editingId) {
          const { id, title, rating, content, imgUrl } = item;
          const initialValues = { title, rating, content };

          const handleSubmit = (formData) => onUpdate(id, formData);
          const handleSubmitSuccess = (review) => {
            onUpdateSuccess(review);
            setEditingId(null); // 제출 후 입력 폼 닫기 (item.id !== editingId)
          };

          return (
            <li key={item.id}>
              <ReviewForm
                initialValues={initialValues}
                initialPreview={imgUrl}
                onCancel={handleCancel}
                onSubmit={handleSubmit}
                onSubmitSuccess={handleSubmitSuccess}
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
