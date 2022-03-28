import { useLocalStateWhileAdjusting } from "components/hooks";
import { useCallback, useState } from "react";
import { Slider } from "react-nexusui";
import { TrackProps } from "./types";

const VolumeSlider = ({ track }: TrackProps) => {
  const deviceProperty = track.volume;

  const [localValue, setLocalValue] = useState(deviceProperty.value);
  const [handleControlIsBeingAdjusted, isAdjusting] =
    useLocalStateWhileAdjusting();
  const handleChange = useCallback(
    (newValue: number) => {
      setLocalValue(newValue);
      handleControlIsBeingAdjusted();
    },
    [setLocalValue, handleControlIsBeingAdjusted]
  );
  return (
    <div>
      <Slider
        size={[25, 200]}
        mode="absolute"
        min={deviceProperty.min}
        max={deviceProperty.max}
        value={isAdjusting ? localValue : deviceProperty.value}
        onChange={handleChange}
      />
      <div>volume</div>
    </div>
  );
};

export default VolumeSlider;
