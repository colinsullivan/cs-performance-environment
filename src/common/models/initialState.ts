import SCRedux from "supercollider-redux";

import { createAbletonState } from "./ableton";
import { createInitialComponentsState } from "./components";
import { createCrowDevice } from "./crow";
import createInitialHoldMenus from "./menus/menus";
import { createQuadTrackConfig } from "./mixer";
import { createOctatrackState } from "./octatrack";
import { READY_STATES } from "./ready_states";
import { createDefaultScaleState } from "./scale";
import { createInitialSequencersState } from "./sequencers";
import { AppState } from "./types";

export const createInitialState = (): AppState => ({
  [SCRedux.DEFAULT_MOUNT_POINT]: {
    scLangReadyState: SCRedux.READY_STATES.INIT,
    scStoreReadyState: SCRedux.READY_STATES.INIT,
    scSynthReadyState: SCRedux.READY_STATES.INIT,
  },
  ableton: createAbletonState(),
  components: createInitialComponentsState(),
  crow: [
    createCrowDevice("0x003600473538510b34393631", "A"),
    createCrowDevice("0x0019003f3538510c34393631", "B"),
    //createCrowDevice('0x005000283238510d36353235', 'C')
  ],
  holdMenus: createInitialHoldMenus(),
  mixerConfiguration: {
    orderedChannelNames: ["v1 bass", "v2 s1", "v3 s2", "v4", "v5 chords", "OT"],
    maxChannels: 16,
    pannerSends: {
      frontSendName: "sendG",
      rearSendName: "sendH",
    },
    quadTrackConfigs: [createQuadTrackConfig("OT", "OT front", "OT rear")],
  },
  octatrack: createOctatrackState(),
  scale: createDefaultScaleState(),
  sequencers: createInitialSequencersState(),
  tempo: 2,
  websocketReadyState: READY_STATES.CLOSED,
});
