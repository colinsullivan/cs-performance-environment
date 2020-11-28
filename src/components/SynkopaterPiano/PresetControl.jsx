import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import AddCircle from "@material-ui/icons/AddCircle";

import TouchButton from "components/TouchButton";
import { synkopater_save_preset } from 'common/actions';

const PresetControl = ({ componentId }) => {
  const dispatch = useDispatch();

  const savePreset = useCallback(() => {
    dispatch(synkopater_save_preset(componentId));
  }, [dispatch, synkopater_save_preset, componentId]);

  return (
    <div className="col">
      <div className="row">

        <TouchButton icon={<AddCircle />} onClick={savePreset} />

      </div>
    </div>
  );
};

export default PresetControl;
