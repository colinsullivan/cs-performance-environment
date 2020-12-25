import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

import TouchButton from "components/TouchButton";
import AddCircle from "@material-ui/icons/AddCircle";
import { synkopater_save_preset } from "common/actions";

const SavePresetButton = ({ componentId }) => {
  const dispatch = useDispatch();
  const savePreset = useCallback(() => {
    dispatch(synkopater_save_preset(componentId));
  }, [dispatch, synkopater_save_preset, componentId]);
  return (
          <TouchButton icon={<AddCircle />} onClick={savePreset} />
  );
};

export default SavePresetButton;
