import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { createUseStyles } from "react-jss";

import {
  AbletonDeviceParamName,
  AbletonTrack,
} from "common/models/ableton/api";
import { turquoiseLightFull, turquoiseLightTen } from "constants/colors";
import { useLocalStateWhileAdjusting } from "components/hooks";
import { handleTrackDeviceParamValueChanged } from "common/actions";
import {
  touchControlBorderWidth,
  transparentBackgroundTouchControl,
} from "components/styles";
import { clamp, createLinearScale } from "common/util";
import {createPoint} from "common/models/geometry";

interface DeviceParamSliderProps {
  track: AbletonTrack;
  deviceParamName: AbletonDeviceParamName;
  label?: string;
  width: number;
  height: number;
}

const useStyles = createUseStyles<
  "slider" | "sliderFiller",
  DeviceParamSliderProps
>({
  slider: {
    ...transparentBackgroundTouchControl,
    position: "relative",
    boxSizing: "border-box",
    width: (props) => props.width,
    height: (props) => props.height,
  },
  sliderFiller: {
    background: turquoiseLightTen,
    borderTop: `4px solid ${turquoiseLightFull}`,
    boxSizing: "border-box",
    position: "absolute",
    bottom: 0,
    width: (props) => props.width - 2 * touchControlBorderWidth,
  },
});

const DeviceParamSlider = (props: DeviceParamSliderProps) => {
  const styles = useStyles(props);
  const dispatch = useDispatch();

  const { track, deviceParamName, height, label } = props;
  const deviceParam = track[deviceParamName];
  const deviceParamToHeightScale = createLinearScale(
    deviceParam.min,
    deviceParam.max,
    0,
    height
  );

  const [touchStartPosition, setTouchStartPosition] = useState(createPoint());
  const [adjustmentStartValue, setAdjustmentStartValue] = useState(deviceParam.min);
  const [localValue, setLocalValue] = useState(deviceParam.value);
  const resetLocalValue = useCallback(
    () => setLocalValue(deviceParam.value),
    [setLocalValue, deviceParam]
  );
  const {
    handleControlIsBeingAdjusted,
    isAdjusting,
    handleControlIsDoneAdjusting,
  } = useLocalStateWhileAdjusting(resetLocalValue);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      setTouchStartPosition(createPoint(
        e.targetTouches[0].pageX,
        e.targetTouches[0].pageY
      ));
      setAdjustmentStartValue(deviceParam.value);
      handleControlIsBeingAdjusted();
    },
    [setTouchStartPosition, handleControlIsBeingAdjusted, deviceParam]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const movedAmount = touchStartPosition.y - e.targetTouches[0].pageY;
      const movedPercent = movedAmount / height;

      let newValue =
        adjustmentStartValue +
        (deviceParam.max - deviceParam.min) * movedPercent;

      newValue = clamp(newValue, deviceParam.min, deviceParam.max);
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

  const currentValue = isAdjusting ? localValue : deviceParam.value;

  const sliderFillerStyle = {
    height: deviceParamToHeightScale(currentValue),
  };

  return (
    <div>
      <div
        className={styles.slider}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleControlIsDoneAdjusting}
      >
        <div style={sliderFillerStyle} className={styles.sliderFiller}></div>
      </div>
      {label ? <div>{label}</div> : null}
    </div>
  );
};

export default DeviceParamSlider;
