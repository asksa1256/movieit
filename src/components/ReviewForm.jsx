import { useState } from "react";
import "./ReviewForm.css";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";

function ReviewForm() {
  const [values, setValues] = useState({
    title: "",
    rating: 0,
    content: "",
    imgFile: null,
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(values);
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
      <button type="submit">확인</button>
    </form>
  );
}

export default ReviewForm;
