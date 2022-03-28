import { useCallback, useState } from "react";
import { Number } from "react-nexusui";
import { useConditionalTimeout } from "beautiful-react-hooks";

import { abletonUpdateTempo } from "common/actions";
import { getAbletonTempo } from "common/selectors";
import { useDispatch, useSelector } from "react-redux";

const TempoControl = () => {
  const dispatch = useDispatch();
  const bpm = useSelector(getAbletonTempo);
  const [isLocalBpmChanging, setIsLocalBpmChanging] = useState(false);
  const [localBpm, setLocalBpm] = useState(bpm);

  // If local bpm is changing, after a delay, reset local state to state
  // from Ableton
  const [isTimeoutClear, clearTimeout] = useConditionalTimeout(() => {
    setIsLocalBpmChanging(false);
    setLocalBpm(bpm);
  }, 500, isLocalBpmChanging)

  const handleChange = useCallback(
    (newValue: number) => {
      if (!isTimeoutClear) {
        clearTimeout();
      }
      dispatch(abletonUpdateTempo(newValue));
      setLocalBpm(newValue);
      setIsLocalBpmChanging(true);
    },
    [dispatch, clearTimeout, isTimeoutClear]
  );

  return (
    <Number
      size={[100, 50]}
      min={20}
      max={999}
      step={1}
      onChange={handleChange}
      value={isLocalBpmChanging ? localBpm : bpm}
    />
  );
};

export default TempoControl;
