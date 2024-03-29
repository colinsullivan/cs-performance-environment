import { useCallback, useState } from "react";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";

import { handleTempoUpdated } from "common/actions";
import { getAbletonTempo } from "common/selectors";
import { useLocalStateWhileAdjusting } from "components/hooks";
import { createLinearScale } from "common/util";
import { Point } from "common/models";
import { turquoiseLightHalf } from "constants/colors";
import { roundTwoDecimals } from "common/util";
const labelHeight = 50;
const width = 100;

const height = 500;

const useStyles = createUseStyles({
  tempoControl: {
    height,
    width,
    border: `1px solid ${turquoiseLightHalf}`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  tempoLabel: {
    height: labelHeight,
    fontSize: "24px",
  },
});

const TempoControl = () => {
  const dispatch = useDispatch();
  const bpm = useSelector(getAbletonTempo);
  const styles = useStyles();

  const [localValue, setLocalValue] = useState(bpm);
  // Since this is a relative control, captures the value when dragging starts
  const [startingValue, setStartingValue] = useState(bpm);
  const pxToTempoChangeScale = createLinearScale(0, height, 0, 200, false);

  const handleValueUpdated = (touchPos: Point, touchStartPos: Point) => {
    const diff = -1.0 * (touchPos.y - touchStartPos.y);
    const changeAmount = pxToTempoChangeScale(diff);
    const newValue = startingValue + changeAmount;
    setLocalValue(newValue);
    dispatch(handleTempoUpdated(newValue));
  };

  const { isAdjusting, handleTouchStart, handleTouchMove, handleTouchEnd } =
    useLocalStateWhileAdjusting(
      handleValueUpdated,
      undefined,
      useCallback(() => setStartingValue(bpm), [setStartingValue, bpm])
    );

  const currentValue = roundTwoDecimals(isAdjusting ? localValue : bpm);

  return (
    <div
      className={styles.tempoControl}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <label className={styles.tempoLabel}>{currentValue}</label>
    </div>
  );
};

export default TempoControl;
