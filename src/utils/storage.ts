import "client-only";

export const getLocalStorage = <T>(key: string, defaultValue: T) => {
  const stickyValue = localStorage.getItem(key);

  if (!!stickyValue) return JSON.parse(stickyValue) as T;

  return defaultValue;
};

export const setLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};
