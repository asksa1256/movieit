const FileInput = ({ name, onChange }) => {
  const handleFileChange = (e) => {
    const nextFile = e.target.files[0];
    onChange(name, nextFile);
  };
  return <input type="file" onChange={handleFileChange} />;
};

export default FileInput;
