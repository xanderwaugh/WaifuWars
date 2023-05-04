import { useEffect } from "react";
import { useDebouncedState } from "@mantine/hooks";

export const useScrollPosition = () => {
  const [debouncedScroll, setDebouncedScroll] = useDebouncedState<number>(
    0,
    250,
  );

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setDebouncedScroll(y);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [setDebouncedScroll]);

  return debouncedScroll;
};
