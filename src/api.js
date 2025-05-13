const BASE_URL = "https://learn.codeit.kr/api";

export async function getReviews({ order = "rating", offset = 0, limit = 10 }) {
  const query = `order=${order}&offset=${offset}&limit=${limit}`;
  const response = await fetch(`${BASE_URL}/film-reviews?${query}`);

  if (!response.ok) {
    throw new Error("리뷰를 불러오지 못했어요!");
  }

  const body = await response.json();
  return body;
}

export async function createReview(reviewData) {
  const response = await fetch(`${BASE_URL}/film-reviews`, {
    method: "POST",
    body: reviewData,
  });

  if (!response.ok) {
    throw new Error("리뷰를 등록하지 못했어요!");
  }

  const body = await response.json();
  return body;
}
