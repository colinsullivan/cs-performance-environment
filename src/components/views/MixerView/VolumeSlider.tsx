import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { createUseStyles } from "react-jss";

import { handleTrackVolumeChanged } from "common/actions";
import { useLocalStateWhileAdjusting } from "components/hooks";
import { TrackProps } from "./types";

const useStyles = createUseStyles({
  slider: {
    background: "transparent",
    // TODO: colors
    border: `2px solid rgba(161, 203, 196, 0.5)`,
    position: "relative",
    boxSizing: "content-box"
  },
  sliderFiller: {
    // TODO: colors
    background: "rgba(161, 203, 196, 0.1)",
    borderTop: "6px solid rgba(161, 203, 196, 1.0)",
    position: "absolute",
  }
});

const VolumeSlider = ({ track }: TrackProps) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const deviceParam = track.volume;

  const sliderHeight = 200;

  const [touchStartPosition, setTouchStartPosition] = useState(0.0);
  const [adjustmentStartValue, setAdjustmentStartValue] = useState(0.0);
  const [localValue, setLocalValue] = useState(deviceParam.value);
  const {handleControlIsBeingAdjusted, isAdjusting, handleControlIsDoneAdjusting} =
    useLocalStateWhileAdjusting();
  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const pos = e.touches[0].pageY;
    setTouchStartPosition(pos);
    setAdjustmentStartValue(deviceParam.value);
    handleControlIsBeingAdjusted();
  }, [setTouchStartPosition, handleControlIsBeingAdjusted, deviceParam]);
  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const pos = e.touches[0].pageY;
    const movedAmount = touchStartPosition - pos;
    const movedPercent = movedAmount / sliderHeight;

    let newValue = adjustmentStartValue +
      (deviceParam.max - deviceParam.min) * movedPercent;
    newValue = Math.max(newValue, deviceParam.min);
    newValue = Math.min(newValue, deviceParam.max);
    setLocalValue(newValue);
    dispatch(handleTrackVolumeChanged(track, newValue));
  }, [dispatch, deviceParam, touchStartPosition, track, adjustmentStartValue]);

  const width = 50;
  const sliderStyle = {
    height: sliderHeight,
    width,
  };

  const currentValue = isAdjusting ? localValue : deviceParam.value;

  const sliderFillerStyle = {
    bottom: 0,
    height: currentValue * sliderHeight,
    width
  };

  return (
    <div>
      <div
        style={sliderStyle}
        className={styles.slider}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleControlIsDoneAdjusting}
      >
        <div style={sliderFillerStyle} className={styles.sliderFiller}></div>
      </div>
      <div>volume</div>
    </div>
  );
};

export default VolumeSlider;
