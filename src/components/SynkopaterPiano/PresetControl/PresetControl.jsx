import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import AddCircle from "@material-ui/icons/AddCircle";

import TouchButton from "components/TouchButton";
import { synkopater_save_preset } from "common/actions";
import OctatrackFollowControl from "./OctatrackFollowControl";
import PresetIndicatorRows from "./PresetIndicatorRows";

const PresetControl = ({ componentId }) => {
  const dispatch = useDispatch();
  const savePreset = useCallback(() => {
    dispatch(synkopater_save_preset(componentId));
  }, [dispatch, synkopater_save_preset, componentId]);

  return (
    <div className="col">
      <div className="row">
        <PresetIndicatorRows componentId={componentId} />
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
