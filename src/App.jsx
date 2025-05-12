import { useState, useEffect } from "react";
import "./App.css";
import ReviewList from "./components/ReviewList";
import { getReviews } from "./api";
import ReviewForm from "./components/ReviewForm";

const LIMIT = 10;

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("rating");
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  const handleSelect = (e) => {
    setOrder(e.target.value);
  };

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleLoad = async (options) => {
    let result;
    try {
      setLoadingError(null);
      setIsLoading(true);
      result = await getReviews(options);
    } catch (e) {
      setLoadingError(e);
      return; // 여기서 리턴 안하면 에러나도 try catch 이후 구문들이 모두 실행됨
    } finally {
      setIsLoading(false);
    }
    const { reviews, paging } = result;

    if (options.offset === 0) {
      setItems(reviews); // 초기 데이터 (0~10번째)
    } else {
      setItems((prevItems) => [...prevItems, ...reviews]); // 더보기 (+10개씩)
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
      <ReviewForm />
      <ReviewList items={items} onDelete={handleDelete} />
      {!loadingError && hasNext && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더 보기
        </button>
      )}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </>
  );
}

export default App;
