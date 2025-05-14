const SelectLocale = ({ value, onChange }) => {
  const handleSelectChange = (e) => onChange(e.target.value);

  return (
    <select value={value} onChange={handleSelectChange}>
      <option value="ko">한국어</option>
      <option value="en">English</option>
    </select>
  );
};

export default SelectLocale;
