import { useCallback, useRef, useState } from "react";

export const useLocalStateWhileAdjusting = (): [() => void, boolean] => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isAdjusting, setIsAdjusting] = useState(false);

  const handleTimeoutFinished = () => {
    setIsAdjusting(false);
  };

  const handleControlIsBeingAdjusted = useCallback(() => {
    setIsAdjusting(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(handleTimeoutFinished, 500);
  }, [setIsAdjusting, timeoutRef]);

  return [handleControlIsBeingAdjusted, isAdjusting];
};
