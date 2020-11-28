import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddCircle from "@material-ui/icons/AddCircle";
import styled from "styled-components";

import TouchButton from "components/TouchButton";
import { synkopater_save_preset, synkopater_load_preset } from 'common/actions';
import { getPerformanceComponents } from "common/selectors";

const PresetIndicatorBox = styled.div`
  width: 24px;
  height: 24px;
  background-color: rgba(64,128,64,0.75);
  display: inline-block;
  margin-right: 6px;
  color: white;
  font-size: 18px;
`;

const PresetIndicator = ({ preset, componentId }) => {
  const dispatch = useDispatch();
  //const { followOctatrackPattern, octatrackPatternValue } = preset;

  const loadPreset = useCallback(() => {
    dispatch(synkopater_load_preset(componentId, preset.id));
  }, [dispatch, synkopater_load_preset, componentId, preset.id]);


  return <PresetIndicatorBox onClick={loadPreset} />;
  
};

const PresetControl = ({ componentId }) => {
  const dispatch = useDispatch();
  const component = useSelector(state => getPerformanceComponents(state)[componentId]);

  const savePreset = useCallback(() => {
    dispatch(synkopater_save_preset(componentId));
  }, [dispatch, synkopater_save_preset, componentId]);

  return (
    <div className="col">
      <div className="row">
        <div className="col">
          {component.presets.map(preset => <PresetIndicator key={preset.id} preset={preset} componentId={componentId} />)}
        </div>
        <div className="col-2">
          <TouchButton icon={<AddCircle />} onClick={savePreset} />
        </div>


      </div>
    </div>
  );
};

export default PresetControl;
