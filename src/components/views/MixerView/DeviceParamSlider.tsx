import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { createUseStyles } from "react-jss";

import {
  AbletonDeviceParamNames,
  AbletonTrack,
} from "common/models/ableton/api";
import {
  turquoiseLightHalf,
  turquoiseLightFull,
  turquoiseLightTen,
} from "constants/colors";
import { useLocalStateWhileAdjusting } from "components/hooks";
import { handleTrackDeviceParamValueChanged } from "common/actions";

interface DeviceParamSliderProps {
  track: AbletonTrack;
  deviceParamName: AbletonDeviceParamNames;
  label: string;
  width: number;
  height: number;
}

const useStyles = createUseStyles<
  "slider" | "sliderFiller",
  DeviceParamSliderProps
>({
  slider: {
    background: "transparent",
    border: `2px solid ${turquoiseLightHalf}`,
    position: "relative",
    boxSizing: "content-box",
    width: (props) => props.width,
  },
  sliderFiller: {
    background: turquoiseLightTen,
    borderTop: `4px solid ${turquoiseLightFull}`,
    position: "absolute",
    bottom: 0,
    width: (props) => props.width,
  },
});

const DeviceParamSlider = (props: DeviceParamSliderProps) => {
  const styles = useStyles(props);
  const dispatch = useDispatch();

  const { track, deviceParamName, height, label } = props;
  const deviceParam = track[deviceParamName];

  const [touchStartPosition, setTouchStartPosition] = useState(0.0);
  const [adjustmentStartValue, setAdjustmentStartValue] = useState(0.0);
  const [localValue, setLocalValue] = useState(deviceParam.value);
  const {
    handleControlIsBeingAdjusted,
    isAdjusting,
    handleControlIsDoneAdjusting,
  } = useLocalStateWhileAdjusting();
  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const pos = e.touches[0].pageY;
      setTouchStartPosition(pos);
      setAdjustmentStartValue(deviceParam.value);
      handleControlIsBeingAdjusted();
    },
    [setTouchStartPosition, handleControlIsBeingAdjusted, deviceParam]
  );
  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const pos = e.touches[0].pageY;
      const movedAmount = touchStartPosition - pos;
      const movedPercent = movedAmount / height;

      let newValue =
        adjustmentStartValue +
        (deviceParam.max - deviceParam.min) * movedPercent;
      newValue = Math.max(newValue, deviceParam.min);
      newValue = Math.min(newValue, deviceParam.max);
      setLocalValue(newValue);
      dispatch(
        handleTrackDeviceParamValueChanged(track, deviceParamName, newValue)
      );
    },
    [
      dispatch,
      deviceParam,
      deviceParamName,
      touchStartPosition,
      track,
      adjustmentStartValue,
      height,
    ]
  );

  const sliderStyle = {
    height: height,
  };

  const currentValue = isAdjusting ? localValue : deviceParam.value;

  const currentPercent = currentValue / (deviceParam.max - deviceParam.min);

  const sliderFillerStyle = {
    height: currentPercent * height,
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
      <div>{label}</div>
    </div>
  );
};

export default DeviceParamSlider;
