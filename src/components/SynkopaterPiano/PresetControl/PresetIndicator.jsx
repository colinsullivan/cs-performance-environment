import React, { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  synkopater_load_preset,
  synkopater_update_preset,
  synkopater_delete_preset,
} from "common/actions";
import { getPerformanceComponents } from "common/selectors";

import "./PresetIndicator.scss";

const formatOctatrackPatternValue = ({ octatrackPatternValue }) =>
  octatrackPatternValue + 1;

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

  // If indicator is held for 1 sec, deletes the corresponding preset
  const touchingTimer = useRef(null);
  const clearTimer = useCallback(() => {
    clearTimeout(touchingTimer.current);
    touchingTimer.current = null;
  }, [touchingTimer]);

  const handleTouchStart = useCallback(() => {
    clearTimer();
    touchingTimer.current = setTimeout(() => {
      if (!isSelected) {
        dispatch(synkopater_delete_preset(componentId, preset));
      }
    }, 1000);
  }, [
    clearTimer,
    isSelected,
    dispatch,
    synkopater_delete_preset,
    componentId,
    preset,
  ]);

  const handleTouchEnd = clearTimer;

  return (
    <div
      className={`preset-indicator ${isSelected ? "selected" : ""}`}
      onClick={isSelected ? updatePreset : loadPreset}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div>
        <div>
          {preset.octatrackPatternValue !== null
            ? formatOctatrackPatternValue(preset)
            : "N"}
        </div>
      </div>
    </div>
  );
};
export default PresetIndicator;
