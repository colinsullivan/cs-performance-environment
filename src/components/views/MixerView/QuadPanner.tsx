import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useState } from "react";
import CSS from "csstype";

import { AbletonTrack } from "common/models/ableton/api";
import { mixerChannelWidth, mixerChannelMargin } from "constants/ui";
import { transparentBackgroundTouchControl } from "components/styles";
import { turquoiseLightFull } from "constants/colors";
import { getMixerConfiguration } from "common/selectors";
import { createPoint, Point } from "common/models";
import { useLocalStateWhileAdjusting } from "components/hooks";
import { createLinearScale } from "common/util";
import { handleTrackPannerValueChanged } from "common/actions";

interface QuadPannerProps {
  track: AbletonTrack;
}

const dotSize = 12;
const height = mixerChannelWidth - mixerChannelMargin;
const width = height;
const useStyles = createUseStyles({
  panner: {
    ...transparentBackgroundTouchControl,
    width,
    height,
    marginBottom: mixerChannelMargin,
    position: "relative",
  },
  pannerPositionDot: {
    background: turquoiseLightFull,
    height: dotSize,
    width: dotSize,
    clipPath: "circle()",
    shapeOutside: "circle()",
    position: "absolute",

    // negative margin css hack to position dot relative to center.
    marginLeft: -0.5 * dotSize,
    marginBottom: -0.5 * dotSize,
  },
});

const heightToRearAmpScale = createLinearScale(0, height, 0.0, 1.0);
const widthToPanScale = createLinearScale(0, width, -1.0, 1.0);

const QuadPanner = (props: QuadPannerProps) => {
  const dispatch = useDispatch();
  const { pannerSends } = useSelector(getMixerConfiguration);
  const styles = useStyles();

  const { track } = props;
  //const frontDeviceParam = track[pannerSends.frontSendName];
  const rearDeviceParam = track[pannerSends.rearSendName];
  const pannerDeviceParam = track.panning;

  const [currentTouchPosition, setCurrentTouchPosition] = useState<Point>(
    createPoint()
  );
  const resetLocalValue = useCallback(
    () =>
      setCurrentTouchPosition({
        x: widthToPanScale.invert(pannerDeviceParam.value),
        y: heightToRearAmpScale.invert(rearDeviceParam.value),
      }),
    [rearDeviceParam, pannerDeviceParam]
  );
  const {
    handleControlIsBeingAdjusted,
    isAdjusting,
    handleControlIsDoneAdjusting,
  } = useLocalStateWhileAdjusting(resetLocalValue);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const touchPos: Point = {
        x: e.targetTouches[0].clientX - rect.x,
        y: e.targetTouches[0].clientY - rect.y,
      };
      setCurrentTouchPosition(touchPos);
      handleControlIsBeingAdjusted();
    },
    [handleControlIsBeingAdjusted]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const touchPos: Point = {
        x: e.targetTouches[0].clientX - rect.x,
        y: e.targetTouches[0].clientY - rect.y,
      };
      const frontSendValue = 1.0 - heightToRearAmpScale(touchPos.y);
      const rearSendValue = heightToRearAmpScale(touchPos.y);
      const pannerValue = widthToPanScale(touchPos.x);
      setCurrentTouchPosition(touchPos);
      dispatch(
        handleTrackPannerValueChanged(track, {
          frontSendValue,
          rearSendValue,
          pannerValue,
        })
      );
    },
    [setCurrentTouchPosition, dispatch, track]
  );

  const value = isAdjusting
    ? currentTouchPosition
    : {
        x: widthToPanScale.invert(pannerDeviceParam.value),
        y: heightToRearAmpScale.invert(rearDeviceParam.value),
      };

  const dotPosition: CSS.Properties = {
    top: `${value.y}px`,
    left: `${value.x}px`,
  };

  return (
    <div
      className={styles.panner}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleControlIsDoneAdjusting}
    >
      <div className={styles.pannerPositionDot} style={dotPosition}></div>
    </div>
  );
};

export default QuadPanner;
