import { createSelector } from "reselect";

import { CrowDevice } from "common/models/crow/api";
import { READY_STATES } from "common/models/ready_states";
import {getTempo, sequencersSelector} from ".";

export const getCrow = (state): CrowDevice[] => state.crow;

export const getCrowDeviceReadyStates = createSelector([getCrow], (crow) =>
  crow.map(
    (d) => ({
      name: d.name,
      isReady: d.readyState === READY_STATES.OPEN && d.state.tempo !== undefined
    })
  )
);

export const getCrowState = createSelector(
  [sequencersSelector, getTempo], (sequencers, tempo) => ({
    tempo,
    sustainSynkA: sequencers.synkopaterA.event?.sustain,
    sustainSynkB: sequencers.synkopaterB.event?.sustain,
  })
);
