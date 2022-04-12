import { createSelector } from "reselect";

import { CrowDevice, CrowState } from "common/models/crow/api";
import { READY_STATES } from "common/models/ready_states";
import { getTempo } from "./tempo";
import { sequencersSelector } from "./sequencers";

export const getCrow = (state): CrowDevice[] => state.crow;

export const getCrowDeviceReadyStates = createSelector([getCrow], (crow) =>
  crow.map((d) => ({
    name: d.name,
    isReady: d.readyState === READY_STATES.OPEN,
  }))
);

export const getCrowState = createSelector(
  [sequencersSelector, getTempo],
  (sequencers, tempo) => {
    const newCrowState: CrowState = {
      tempo,
      sustainSynkA: undefined,
      sustainSynkB: undefined,
    };
    const synkopaterA = sequencers.synkopaterA;
    if (synkopaterA.event && !synkopaterA.event.midicmd) {
      newCrowState.sustainSynkA = synkopaterA.event.sustain;
    }

    return newCrowState;
  }
);
