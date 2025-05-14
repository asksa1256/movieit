import { useState } from "react";

const useAsync = (asyncFunc) => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const controlAsyncFunction = async (...args) => {
    try {
      setError(null);
      setPending(true);
      return await asyncFunc(...args);
    } catch (e) {
      setError(e);
      return;
    } finally {
      setPending(false);
    }
  };

  return [pending, error, controlAsyncFunction];
};

export default useAsync;
