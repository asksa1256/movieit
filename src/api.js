export async function getReviews({ order = "rating", offset = 0, limit = 10 }) {
  const query = `order=${order}&offset=${offset}&limit=${limit}`;
  const response = await fetch(
    `https://learn.codeit.kr/api/film-reviews?${query}`
  );

  if (!response.ok) {
    throw new Error("리뷰를 불러오지 못했어요!");
  }

  const body = response.json();
  return body;
}
