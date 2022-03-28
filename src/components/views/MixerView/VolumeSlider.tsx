import { handleTrackVolumeChanged } from "common/actions";
import { useLocalStateWhileAdjusting } from "components/hooks";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { TrackProps } from "./types";

const VolumeSlider = ({ track }: TrackProps) => {
  const dispatch = useDispatch();
  const deviceParam = track.volume;

  const sliderHeight = 200;
  const sliderStyle = {
    height: sliderHeight,
    width: 25,
  };

  const [touchStartPosition, setTouchStartPosition] = useState(0.0);
  const [localValue, setLocalValue] = useState(deviceParam.value);
  const [handleControlIsBeingAdjusted, isAdjusting] =
    useLocalStateWhileAdjusting();
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const pos = e.touches[0].pageY;
    setTouchStartPosition(pos);
    handleControlIsBeingAdjusted();
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    handleControlIsBeingAdjusted();
    const pos = e.touches[0].pageY;
    const movedAmount = touchStartPosition - pos;
    const startPercent = touchStartPosition / sliderHeight;
    const movedPercent = movedAmount / sliderHeight;

    let newValue =
      (deviceParam.max - deviceParam.min) * (startPercent + movedPercent);
    newValue = Math.max(newValue, deviceParam.min);
    newValue = Math.min(newValue, deviceParam.max);
    setLocalValue(newValue);
    dispatch(handleTrackVolumeChanged(track, newValue));
  };
  return (
    <div>
      <div
        style={sliderStyle}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
      >
        {isAdjusting ? localValue : deviceParam.value}
      </div>
      <div>volume</div>
    </div>
  );
};

export default VolumeSlider;
