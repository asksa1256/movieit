import { useState, useEffect } from "react";
import "./App.css";
import ReviewList from "./components/ReviewList";
import { getReviews } from "./api";

const LIMIT = 10;

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("rating");
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(true);

  const handleSelect = (e) => {
    setOrder(e.target.value);
  };

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleLoad = async (options) => {
    const { reviews, paging } = await getReviews(options);

    if (options.offset === 0) {
      setItems(reviews);
    } else {
      setItems([...items, ...reviews]);
    }

    setOffset(options.offset + reviews.length); // limit:10이므로, 초기 reviews.length 값이 10이라서 초기 offset(시작 위치)값으로부터 +10씩 offset 위치 이동.
    setHasNext(paging.hasNext);
  };

  const handleLoadMore = () => {
    handleLoad({ order, offset, limit: LIMIT });
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order]);

  return (
    <>
      <select name="selectOrder" id="selectOrder" onChange={handleSelect}>
        <option value="createdAt">최신순</option>
        <option value="rating">별점 높은순</option>
      </select>
      <ReviewList items={items} onDelete={handleDelete} />
      {hasNext && <button onClick={handleLoadMore}>더 보기</button>}
    </>
  );
}

export default App;
