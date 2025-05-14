import { useState } from "react";
import "./ReviewForm.css";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import useAsync from "../hooks/useAsync";

const INITIAL_VALUES = {
  title: "",
  rating: 0,
  content: "",
  imgFile: null,
};

function ReviewForm({
  initialValues = INITIAL_VALUES,
  onSubmitSuccess,
  onCancel,
  onSubmit,
  initialPreview,
}) {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, submitError, onSubmitAsync] = useAsync(onSubmit);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(); // 이 프로젝트에서 사용되는 api가 파일 업로드를 편하게 하기 위해 'FormData' 형식을 사용.
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const result = await onSubmitAsync(formData);
    if (!result) return;

    const { review } = result;

    onSubmitSuccess(review);
    setValues(INITIAL_VALUES);
  };

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        onChange={handleChange}
        initialPreview={initialPreview}
      />
      <input name="title" value={values.title} onChange={handleInputChange} />
      <RatingInput
        name="rating"
        value={values.rating}
        onChange={handleChange}
      />
      <textarea
        name="content"
        value={values.content}
        onChange={handleInputChange}
      />
      <button type="submit" disabled={isSubmitting}>
        확인
      </button>
      {onCancel && (
        <button type="button" onClick={onCancel}>
          취소
        </button>
      )}
      {submitError?.message && <p>{submitError.message}</p>}
    </form>
  );
}

export default ReviewForm;
