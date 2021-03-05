import React from "react";
import { useSelector } from "react-redux";
import styled from 'styled-components';

import { getPerformanceComponents } from "common/selectors";
import PresetIndicator from "./PresetIndicator";

const PresetIndicatorRowsContainer = styled.div`
  width: 100%;
  height: auto;
  overflow: scroll;
`;

const PresetIndicatorRows = ({ componentId }) => {
  const component = useSelector(
    (state) => getPerformanceComponents(state)[componentId]
  );
  return (
    <div className="col">
      <PresetIndicatorRowsContainer>
      {component.presets.map((preset) => (
        <PresetIndicator
          key={preset.id}
          preset={preset}
          componentId={componentId}
        />
      ))}
        </PresetIndicatorRowsContainer>
    </div>
  );
};

export default PresetIndicatorRows;
