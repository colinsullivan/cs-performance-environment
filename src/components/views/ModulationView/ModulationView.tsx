import styled from "styled-components";

import { sequencerIds } from "common/models";
import SeqModulationControls from "./SeqModulationControls";

const ModulationViewContainer = styled.div``;

const ModulationView = () => (
  <ModulationViewContainer>
    {sequencerIds.map((sequencerId) => (
      <SeqModulationControls key={sequencerId} sequencerId={sequencerId} />
    ))}
  </ModulationViewContainer>
);

export default ModulationView;
