import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sequencersSelector } from "common/selectors";
import { sequencer_toggle_euclid_bounce } from "common/actions";
import ToggleButtonWithLabel from "components/ToggleButtonWithLabel";

const EuclidBounceToggle = ({ sequencerId }) => {
  const dispatch = useDispatch();
  const sequencer = useSelector(
    (state) => sequencersSelector(state)[sequencerId]
  );
  const { euclidBounceEnabled } = sequencer;
  const onClick = useCallback(
    () => dispatch(sequencer_toggle_euclid_bounce(sequencerId)),
    [dispatch, sequencer_toggle_euclid_bounce, sequencerId]
  );
  return (
    <ToggleButtonWithLabel
      labelText="bounce"
      enabled={euclidBounceEnabled}
      onClick={onClick}
    />
  );
};

export default EuclidBounceToggle;
