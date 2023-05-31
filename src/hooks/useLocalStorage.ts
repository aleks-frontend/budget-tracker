import { useEffect, useState } from "react";

// create a useLocalStorage hook to store the cart in local storage
export const useLocalStorage = (key: string, initialValue: any) => {
  const [value, setValue] = useState(() => {
    const jsonValue = window.localStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
