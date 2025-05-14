import { useState, useEffect, useCallback } from "react";
import "./App.css";
import ReviewList from "./components/ReviewList";
import { createReview, updateReview, deleteReview, getReviews } from "./api";
import ReviewForm from "./components/ReviewForm";
import useAsync from "./hooks/useAsync";
import LocaleContext from "./contexts/LocaleContext";
import SelectLocale from "./components/SelectLocale";

const LIMIT = 10;

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("rating");
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, loadingError, getReviewsAsync] = useAsync(getReviews);
  const [locale, setLocale] = useState("ko");

  const handleSelect = (e) => {
    setOrder(e.target.value);
  };

  const handleDelete = async (id) => {
    const result = await deleteReview(id);
    if (!result) return; // 삭제 성공 시에만 아래 코드 실행

    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleLoad = useCallback(
    async (options) => {
      const result = await getReviewsAsync(options);
      if (!result) return;

      const { reviews, paging } = result;

      if (options.offset === 0) {
        setItems(reviews); // 초기 데이터 (0~10번째)
      } else {
        setItems((prevItems) => [...prevItems, ...reviews]); // 더보기 (+10개씩)
      }

      setOffset(options.offset + reviews.length); // limit:10이므로, 초기 reviews.length 값이 10이라서 초기 offset(시작 위치)값으로부터 +10씩 offset 위치 이동.
      setHasNext(paging.hasNext);
    },
    [getReviewsAsync]
  );

  const handleLoadMore = () => {
    handleLoad({ order, offset, limit: LIMIT });
  };

  // 리뷰 등록/수정 성공 시 api 리스폰스 반영
  const handleSubmitSuccess = (review) => {
    setItems((prevItems) => [review, ...prevItems]); // review가 '비동기'로 불러와지는 데이터이기 때문에, 함수형 업데이트 방식 사용. (콜백으로 prevState 받아와서 안정적으로 누적하는 방식)
  };

  const handleUpdateSuccess = (updateItem) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === updateItem.id);
      return [
        ...prevItems.slice(0, splitIdx),
        updateItem,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order, handleLoad]);

  return (
    <LocaleContext.Provider value={locale}>
      <div className="SelectLocale">
        <SelectLocale value={locale} onChange={setLocale} />
      </div>
      <div className="SelectOrder">
        <select name="selectOrder" id="selectOrder" onChange={handleSelect}>
          <option value="createdAt">최신순</option>
          <option value="rating">별점 높은순</option>
        </select>
      </div>
      <ReviewForm
        onSubmit={createReview}
        onSubmitSuccess={handleSubmitSuccess}
      />
      <ReviewList
        items={items}
        onDelete={handleDelete}
        onUpdate={updateReview}
        onUpdateSuccess={handleUpdateSuccess}
      />
      {!loadingError && hasNext && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더 보기
        </button>
      )}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </LocaleContext.Provider>
  );
}

export default App;
