import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { synkopater_toggle_follow_octatrack } from "common/actions";
import { getPerformanceComponents } from "common/selectors";
import ToggleButtonWithLabel from "components/ToggleButtonWithLabel";

const OctatrackFollowControl = ({ componentId }) => {
  const dispatch = useDispatch();
  const component = useSelector(
    (state) => getPerformanceComponents(state)[componentId]
  );
  const enabled = component.followOctatrackPattern;
  const onClick = useCallback(
    () => dispatch(synkopater_toggle_follow_octatrack(componentId)),
    [dispatch, componentId]
  );
  return (
    <ToggleButtonWithLabel labelText="OT" enabled={enabled} onClick={onClick} />
  );
};

export default OctatrackFollowControl;
