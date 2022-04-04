import { useDispatch } from "react-redux";
import { createUseStyles } from "react-jss";

import { AbletonDeviceParamName } from "common/models/ableton/api";
import { turquoiseLightFull, turquoiseLightTen } from "constants/colors";
import { useLocalStateWhileAdjusting } from "components/hooks";
import { handleTrackDeviceParamValueChanged } from "common/actions";
import {
  touchControlBorderWidth,
  transparentBackgroundTouchControl,
} from "components/styles";
import { createLinearScale } from "common/util";
import { getCanonicalTrack, Point, TrackViewModel } from "common/models";

interface DeviceParamSliderProps {
  trackView: TrackViewModel;
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
  const dispatch = useDispatch();
  const styles = useStyles(props);

  const { trackView, deviceParamName, height, label } = props;
  const track = getCanonicalTrack(trackView);
  const deviceParam = track[deviceParamName];
  const deviceParamToYScale = createLinearScale(
    deviceParam.min,
    deviceParam.max,
    height,
    0
  );
  const deviceParamToHeightScale = createLinearScale(
    deviceParam.min,
    deviceParam.max,
    0,
    height
  );

  const handleValueUpdated = (touchPos: Point) => {
    const newValue = deviceParamToYScale.invert(touchPos.y);
    dispatch(
      handleTrackDeviceParamValueChanged(trackView, deviceParamName, newValue)
    );
  };

  const {
    isAdjusting,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    currentTouchPosition,
  } = useLocalStateWhileAdjusting(handleValueUpdated);

  const currentValue = isAdjusting
    ? height - currentTouchPosition.y
    : deviceParamToHeightScale(deviceParam.value);

  const sliderFillerStyle = {
    height: currentValue,
  };

  return (
    <div>
      <div
        className={styles.slider}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div style={sliderFillerStyle} className={styles.sliderFiller}></div>
      </div>
      {label ? <div>{label}</div> : null}
    </div>
  );
};

export default DeviceParamSlider;
