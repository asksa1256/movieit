import { useLocale, useSetLocale } from "../contexts/LocaleContext.jsx";

const LocaleSelect = () => {
  const locale = useLocale();
  const setLocale = useSetLocale();

  const handleSelectChange = (e) => setLocale(e.target.value);

  return (
    <select value={locale} onChange={handleSelectChange}>
      <option value="ko">한국어</option>
      <option value="en">English</option>
    </select>
  );
};

export default LocaleSelect;
