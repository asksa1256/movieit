import { useState } from "react";
import "./ReviewForm.css";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import { createReview } from "../api";

const INITIAL_VALUES = {
  title: "",
  rating: 0,
  content: "",
  imgFile: null,
};

function ReviewForm() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [isSubmitting, setIsSubmitting] = useState(false); // 동일한 전송 여러번 하지 않도록 로딩 추가
  const [submitError, setSubmitError] = useState(null); // 전송 에러 제어

  // handleInputChange: 제어 컴포넌트용 handleChange
  // file input 비제어 컴포넌트화 과정에서 handleChange => handleChange, handleInputChange로 추상화 추가
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  // handleChange: 비제어 컴포넌트용 handleChange
  // file input(비제어 컴포넌트)에 file name, file value(img) 전달
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

    try {
      setSubmitError(null);
      setIsSubmitting(true);
      await createReview(formData);
      setValues(INITIAL_VALUES);
    } catch (e) {
      setSubmitError(e);
      return;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        onChange={handleChange}
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
      {submitError?.message && <p>{submitError.message}</p>}
    </form>
  );
}

export default ReviewForm;
