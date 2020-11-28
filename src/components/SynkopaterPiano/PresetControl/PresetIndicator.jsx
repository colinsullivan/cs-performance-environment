import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import {
  synkopater_load_preset,
  synkopater_update_preset,
} from "common/actions";
import { getPerformanceComponents } from "common/selectors";

const PresetIndicatorBox = styled.div`
  width: 24px;
  height: 24px;
  ${({ isSelected }) =>
    isSelected
      ? `background-color: rgba(200, 64, 64, 1.0);`
      : `background-color: rgba(64, 128, 64, 0.75);`}
  display: inline-block;
  margin-right: 6px;
  color: white;
  font-size: 18px;
`;

const PresetIndicator = ({ preset, componentId }) => {
  const dispatch = useDispatch();
  const component = useSelector(
    (state) => getPerformanceComponents(state)[componentId]
  );
  const isSelected = component.currentPresetId === preset.id;

  const updatePreset = useCallback(() => {
    dispatch(synkopater_update_preset(componentId));
  }, [dispatch, synkopater_update_preset, componentId]);

  const loadPreset = useCallback(() => {
    dispatch(synkopater_load_preset(componentId, preset.id));
  }, [dispatch, synkopater_load_preset, componentId, preset.id]);

  return (
    <PresetIndicatorBox
      onClick={isSelected ? updatePreset : loadPreset}
      isSelected={isSelected}
    />
  );
};
export default PresetIndicator;
