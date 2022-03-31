import { useCallback, useRef, useState } from "react";

interface UseLocalStateWhileAdjustingResult {
  handleControlIsBeingAdjusted: () => void;
  isAdjusting: boolean;
  handleControlIsDoneAdjusting: () => void;
}
export const useLocalStateWhileAdjusting = (): UseLocalStateWhileAdjustingResult => {
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
  }, [setIsAdjusting, timeoutRef]);

  const handleControlIsDoneAdjusting = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(handleTimeoutFinished, 500);
  }, [timeoutRef]);


  return {handleControlIsBeingAdjusted, isAdjusting, handleControlIsDoneAdjusting};
};
