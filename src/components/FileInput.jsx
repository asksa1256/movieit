import { useState, useEffect, useRef } from "react";

const FileInput = ({ name, value, onChange }) => {
  const [preview, setPreview] = useState();
  const inputRef = useRef();

  const handleFileChange = (e) => {
    const nextFile = e.target.files[0];
    onChange(name, nextFile);
  };

  const handleFileClear = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    onChange(name, null);
    inputNode.value = "";
  };

  useEffect(() => {
    if (!value) return;
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview();
      URL.revokeObjectURL(value);
    };
  }, [value]);

  return (
    <div>
      {value && <img src={preview} alt="이미지 미리보기" />}
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
        ref={inputRef}
      />
      {value && <button onClick={handleFileClear}>X</button>}
    </div>
  );
};

export default FileInput;
