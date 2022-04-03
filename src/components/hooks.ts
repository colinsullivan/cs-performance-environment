import { useCallback, useRef, useState } from "react";
import { createPoint, Point } from "common/models";

type DivTouchEvent = React.TouchEvent<HTMLDivElement>;

interface UseLocalStateWhileAdjustingResult {
  handleControlIsBeingAdjusted: () => void;
  isAdjusting: boolean;
  handleControlIsDoneAdjusting: () => void;
  handleTouchStart: (e: DivTouchEvent) => void;
  handleTouchMove: (e: DivTouchEvent) => void;
  handleTouchEnd: (e: DivTouchEvent) => void;
  currentTouchPosition: Point;
}

export const useLocalStateWhileAdjusting = (
  handleValueUpdated: (touchPos: Point, touchStartPos: Point) => void,
  timeoutFinishedCallback?: () => void
): UseLocalStateWhileAdjustingResult => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isAdjusting, setIsAdjusting] = useState(false);
  const [touchStartPos, setTouchStartPos] = useState<Point>(createPoint());
  const [currentTouchPosition, setCurrentTouchPosition] = useState<Point>(
    createPoint()
  );

  const handleTimeoutFinished = useCallback(() => {
    setIsAdjusting(false);
    if (timeoutFinishedCallback) {
      timeoutFinishedCallback();
    }
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

  const handleTouchStart = useCallback(
    (e: DivTouchEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const touchPos: Point = {
        x: e.targetTouches[0].clientX - rect.x,
        y: e.targetTouches[0].clientY - rect.y,
      };
      setTouchStartPos(touchPos);
      setCurrentTouchPosition(touchPos);
      handleControlIsBeingAdjusted();
      handleValueUpdated(touchPos, touchPos);
    },
    [
      handleControlIsBeingAdjusted,
      setCurrentTouchPosition,
      handleValueUpdated,
      setTouchStartPos,
    ]
  );

  const handleTouchMove = useCallback(
    (e: DivTouchEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const touchPos: Point = {
        x: e.targetTouches[0].clientX - rect.x,
        y: e.targetTouches[0].clientY - rect.y,
      };
      setCurrentTouchPosition(touchPos);
      handleValueUpdated(touchPos, touchStartPos);
    },
    [setCurrentTouchPosition, handleValueUpdated, touchStartPos]
  );

  const handleTouchEnd = handleControlIsDoneAdjusting;

  return {
    handleControlIsBeingAdjusted,
    isAdjusting,
    handleControlIsDoneAdjusting,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    currentTouchPosition,
  };
};
