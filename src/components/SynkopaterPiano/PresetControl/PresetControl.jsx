import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCircle from "@material-ui/icons/AddCircle";

import TouchButton from "components/TouchButton";
import { synkopater_save_preset } from "common/actions";
import { getPerformanceComponents } from "common/selectors";
import PresetIndicator from "./PresetIndicator";
import OctatrackFollowControl from './OctatrackFollowControl';

const PresetControl = ({ componentId }) => {
  const dispatch = useDispatch();
  const component = useSelector(
    (state) => getPerformanceComponents(state)[componentId]
  );

  const savePreset = useCallback(() => {
    dispatch(synkopater_save_preset(componentId));
  }, [dispatch, synkopater_save_preset, componentId]);

  return (
    <div className="col">
      <div className="row">
        <div className="col">
          {component.presets.map((preset) => (
            <PresetIndicator
              key={preset.id}
              preset={preset}
              componentId={componentId}
            />
          ))}
        </div>
        <div className="col-2">
          <TouchButton icon={<AddCircle />} onClick={savePreset} />
        </div>
        <div className="col-2">
          <OctatrackFollowControl componentId={componentId} />
        </div>
      </div>
    </div>
  );
};

export default PresetControl;
