import { useState, useCallback } from "react";

const useAsync = (asyncFunc) => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const controlAsyncFunction = useCallback(
    async (...args) => {
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
    },
    [asyncFunc]
  );

  return [pending, error, controlAsyncFunction];
};

export default useAsync;
