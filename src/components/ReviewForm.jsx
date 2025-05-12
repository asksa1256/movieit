import { useState } from "react";

function ReviewForm() {
  const [values, setValues] = useState({
    title: "",
    rating: 0,
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    // 여기서 소괄호로 객체 리터럴을 감싼 이유는 '문법적 간소화' 때문.
    // 원래 형태는 이러함
    /*
    setValues((prevValues) => {
      return {
        ...prevValues,
      [ name]: value,
      }
    });
    */
    // 그러나 위 방식은 다소 복잡해서, 코드를 좀 더 간결하게 쓰고자 자바스크립트 문법상 해당 객체 리터럴을 소괄호로 감싸기만 해도 되도록 허용함.
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <input name="title" value={values.title} onChange={handleChange} />
      <input
        type="number"
        name="rating"
        value={values.rating}
        onChange={handleChange}
      />
      <textarea name="content" value={values.content} onChange={handleChange} />
      <button type="submit">확인</button>
    </form>
  );
}

export default ReviewForm;
