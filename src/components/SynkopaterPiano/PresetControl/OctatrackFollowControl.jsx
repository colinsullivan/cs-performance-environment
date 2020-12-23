import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ToggleOffIcon from "@material-ui/icons/ToggleOff";
import ToggleOnIcon from "@material-ui/icons/ToggleOn";

import TouchButton from "components/TouchButton";
import { synkopater_toggle_follow_octatrack } from "common/actions";
import { getPerformanceComponents } from "common/selectors";

const OctatrackFollowControlContainer = styled.div`
  font-size: 12px;
  text-align: center;
`;

const OctatrackFollowControl = ({ componentId }) => {
  const dispatch = useDispatch();
  const component = useSelector(
    (state) => getPerformanceComponents(state)[componentId]
  );
  const enabled = component.followOctatrackPattern;
  const onClick = useCallback(
    () => dispatch(synkopater_toggle_follow_octatrack(componentId)),
    [dispatch, synkopater_toggle_follow_octatrack, componentId]
  );
  return (
    <OctatrackFollowControlContainer onClick={onClick}>
      <TouchButton icon={enabled ? <ToggleOnIcon /> : <ToggleOffIcon />} />
      <div>OT</div>
    </OctatrackFollowControlContainer>
  );
};

export default OctatrackFollowControl;
