import { Middleware } from "redux";

import {
  SEQUENCER_RANDOMIZE_NOTES,
  SEQUENCER_STATE_UPDATED,
  SEQUENCER_TOGGLE_EUCLID_BOUNCE,
  SEQUENCER_UPDATE_MOD_SEQUENCE,
  SEQUENCER_UPDATE_MOD_SEQUENCE_LENGTH,
  SYNKOPATER_ARP_ADD_NOTE,
  SYNKOPATER_ARP_CHANGE_MODE,
  SYNKOPATER_ARP_REMOVE_NOTE,
  SYNKOPATER_TRANSPOSED,
  sequencerChangesAppliedTimeout,
} from "common/actions";

const sequencerChangeActions = [
  SEQUENCER_RANDOMIZE_NOTES,
  SEQUENCER_STATE_UPDATED,
  SEQUENCER_TOGGLE_EUCLID_BOUNCE,
  SEQUENCER_UPDATE_MOD_SEQUENCE,
  SEQUENCER_UPDATE_MOD_SEQUENCE_LENGTH,
  SYNKOPATER_ARP_ADD_NOTE,
  SYNKOPATER_ARP_CHANGE_MODE,
  SYNKOPATER_ARP_REMOVE_NOTE,
  SYNKOPATER_TRANSPOSED,
];
const SEQUENCER_APPLY_CHANGES_TIMEOUT_DUR = 2000;

class SequencerApplyChangesService {
  sequencerTimeouts: Record<string, ReturnType<typeof setTimeout>>;
  middleware: Middleware<unknown>;
  constructor() {
    // Timeouts for each sequencer are stored here by sequencer id.
    this.sequencerTimeouts = {};

    this.middleware = (store) => (next) => (action) => {
      this.handleMiddleware(store, next, action);
    };
  }

  handleMiddleware(store, next, action) {
    if (sequencerChangeActions.includes(action.type)) {
      const { sequencerId } = action.payload;

      if (sequencerId in this.sequencerTimeouts) {
        clearTimeout(this.sequencerTimeouts[sequencerId]);
      }

      this.sequencerTimeouts[sequencerId] = setTimeout(
        () => this.doSequencerTimeout(sequencerId, store),
        SEQUENCER_APPLY_CHANGES_TIMEOUT_DUR
      );
    }
    next(action);
  }

  doSequencerTimeout(sequencerId: string, store) {
    store.dispatch(sequencerChangesAppliedTimeout(sequencerId));
  }
}

export default SequencerApplyChangesService;
