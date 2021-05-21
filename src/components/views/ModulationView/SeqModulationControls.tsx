import React from "react";
import styled from 'styled-components';
import SeqModParamSliderControl from "./SeqModParamSliderControl";

interface SequencerModulationControlsProps {
  sequencerId: string;
}

const ModulationControlsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 48px;
  div {
    flex: 0 0 auto;
    margin: 0 4px;
  }
`;

const modParams = ["velocities", "cc1", "cc74"];

const SeqModulationControls = ({
  sequencerId,
}: SequencerModulationControlsProps) => {
  return (
    <ModulationControlsContainer>
      {modParams.map((modParam) => (
        <SeqModParamSliderControl
          sequencerId={sequencerId}
          modParam={modParam}
        />
      ))}
    </ModulationControlsContainer>
  );
};

export default SeqModulationControls;
