import { useCallback, useRef, useState } from "react";

interface UseLocalStateWhileAdjustingResult {
  handleControlIsBeingAdjusted: () => void;
  isAdjusting: boolean;
  handleControlIsDoneAdjusting: () => void;
}
export const useLocalStateWhileAdjusting = (
  timeoutFinishedCallback: () => void
): UseLocalStateWhileAdjustingResult => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isAdjusting, setIsAdjusting] = useState(false);

  const handleTimeoutFinished = useCallback(() => {
    setIsAdjusting(false);
    timeoutFinishedCallback();
  }, [setIsAdjusting, timeoutFinishedCallback]);

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
  }, [timeoutRef, handleTimeoutFinished]);

  return {
    handleControlIsBeingAdjusted,
    isAdjusting,
    handleControlIsDoneAdjusting,
  };
};
