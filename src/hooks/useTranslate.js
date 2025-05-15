import { useLocale } from "../contexts/LocaleContext";

const dict = {
  ko: {
    "confirm button": "확인",
    "cancel button": "취소",
    "edit button": "수정",
    "delete button": "삭제",
    latest: "최신순",
    "highest rated": "별점 높은 순",
    search: "검색",
    "view more": "더보기",
  },
  en: {
    "confirm button": "OK",
    "cancel button": "Cancel",
    "edit button": "Edit",
    "delete button": "Delete",
    latest: "Latest",
    "highest rated": "Highest Rated",
    search: "Search",
    "view more": "View More",
  },
};

const useTranslate = () => {
  const locale = useLocale(); // LocaleContext의 훅 useLocale을 사용하므로, LocaleProvider 안에서만 useTranslate 훅 사용 가능.
  const translate = (key) => dict[locale][key] || ""; // 없는 key값으로 조회하면 빈 문자열 리턴
  return translate;
};

export default useTranslate;
