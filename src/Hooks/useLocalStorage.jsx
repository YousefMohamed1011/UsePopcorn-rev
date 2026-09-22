import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);

      return storedValue === null ? initialValue : JSON.parse(storedValue);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Keep the React state usable if browser storage is unavailable.
    }
  }, [key, value]);

  return [value, setValue];
}
