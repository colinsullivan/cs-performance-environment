import { useCallback, useState } from "react";
import { Number } from "react-nexusui";

import { abletonUpdateTempo } from "common/actions";
import { getAbletonTempo } from "common/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStateWhileAdjusting } from "components/hooks";

const TempoControl = () => {
  const { handleControlIsBeingAdjusted, isAdjusting } =
    useLocalStateWhileAdjusting();
  const dispatch = useDispatch();
  const bpm = useSelector(getAbletonTempo);
  const [localBpm, setLocalBpm] = useState(bpm);

  const handleChange = useCallback(
    (newValue: number) => {
      setLocalBpm(newValue);
      dispatch(abletonUpdateTempo(newValue));

      // TODO: determining that the control is being moved based on value
      // changes works but is based on the limitations of NexusUI.
      //
      // It should be based on touch events instead.
      handleControlIsBeingAdjusted();
    },
    [dispatch, handleControlIsBeingAdjusted, setLocalBpm]
  );

  return (
    <Number
      size={[100, 50]}
      min={20}
      max={999}
      step={1}
      onChange={handleChange}
      value={isAdjusting ? localBpm : bpm}
    />
  );
};

export default TempoControl;
