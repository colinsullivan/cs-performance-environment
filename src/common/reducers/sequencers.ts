import _ from "lodash";
import SCReduxSequencers from "supercollider-redux-sequencers";

import {
  AllActionTypes,
  SYNKOPATER_ARP_REMOVE_NOTE,
  SYNKOPATER_ARP_ADD_NOTE,
  SYNKOPATER_ARP_CHANGE_MODE,
  SYNKOPATER_DELAY_TIME_UPDATE,
  SEQUENCER_STATE_UPDATED,
  MIDI_CONTROLLER_CC,
  SYNKOPATER_TRANSPOSED,
  SYNKOPATER_GLOBAL_QUANT_UPDATED,
} from "common/actions/types";
import { TRANSPOSE_DIRECTION } from "common/models/synkopater";
import { Sequencers } from "./types";

const durChoices = [
  1.0 / 128.0,
  1.0 / 64.0,
  1.0 / 32.0,
  1.0 / 16.0,
  1.0 / 8.0,
  1.0 / 4.0,
  1.0 / 2.0,
  1.0,
  2.0,
  4.0,
  8.0,
];

const sequencers = (state: Sequencers, action: AllActionTypes) => {
  state = SCReduxSequencers.reducer(state, action);
  let seq, sequencerId;
  switch (action.type) {
    case SYNKOPATER_ARP_REMOVE_NOTE:
      seq = Object.assign({}, state[action.payload.sequencerId]);

      seq.notes = _.without(seq.notes, action.payload.note);
      //seq.numBeats = seq.notes.length;

      state[action.payload.sequencerId] = seq;
      state = Object.assign({}, state);
      break;

    case SYNKOPATER_ARP_ADD_NOTE:
      seq = Object.assign({}, state[action.payload.sequencerId]);
      seq.notes.splice(
        _.sortedIndex(seq.notes, action.payload.note),
        0,
        action.payload.note
      );
      //seq.numBeats = seq.notes.length;
      state[action.payload.sequencerId] = seq;
      state = Object.assign({}, state);
      break;

    case SYNKOPATER_ARP_CHANGE_MODE:
      seq = Object.assign({}, state[action.payload.sequencerId]);
      seq.arpMode = action.payload.arpMode;
      state[action.payload.sequencerId] = seq;
      state = Object.assign({}, state);
      break;

    case SYNKOPATER_DELAY_TIME_UPDATE:
      return {
        ...state,
        [action.payload.sequencerId]: {
          ...state[action.payload.sequencerId],
          delaySecs: action.payload.delaySecs,
        },
      };

    //case SCRedux.actionTypes.SUPERCOLLIDER_EVENTSTREAMPLAYER_NEXTBEAT:
    //seq = Object.assign({}, state[action.payload.id]);
    //if (action.payload.id === seq.sequencerId) {
    //switch (seq.arpMode) {
    //case ARP_MODES.UP:
    //seq.arp_note_index = seq.beat;
    //break;

    //case ARP_MODES.DOWN:
    //seq.arp_note_index = seq.numBeats - 1 - seq.beat;
    //break;

    //case ARP_MODES.UPDOWN:
    //if (seq.arp_note_index === seq.numBeats - 1) {
    //seq.arp_updown_current_direction = -1;
    //} else if (seq.arp_note_index === 0) {
    //seq.arp_updown_current_direction = 1;
    //}
    //seq.arp_note_index += seq.arp_updown_current_direction;

    //break;

    //default:
    //break;

    //}
    //state[seq.sequencerId] = seq;
    //state = Object.assign({}, state);
    //}

    //break;

    case SEQUENCER_STATE_UPDATED:
      seq = Object.assign({}, state[action.payload.sequencerId]);
      seq[action.payload.param] = action.payload.value;
      state[action.payload.sequencerId] = seq;
      state = Object.assign({}, state);
      break;

    case MIDI_CONTROLLER_CC:
      if (action.payload.controllerId === "launchcontrol") {
        if (action.payload.name === "knu3") {
          const seq = Object.assign({}, state.synkopaterA);
          const knobVal = action.payload.value;
          const selectedDurIndex = Math.round(
            knobVal * (durChoices.length - 1)
          );
          seq.dur = durChoices[selectedDurIndex];
          state.synkopaterA = seq;
          state = Object.assign({}, state);
        }
      }
      break;

    case SYNKOPATER_TRANSPOSED:
      ({ sequencerId } = action.payload);
      const { direction } = action.payload;
      seq = state[sequencerId];
      const sortedNotes = _.orderBy([...seq.notes]);
      const lowestNote = sortedNotes[0];

      if (direction === TRANSPOSE_DIRECTION.UP) {
        return {
          ...state,
          [sequencerId]: {
            ...seq,
            notes: seq.notes.map((n: number) => n + 12),
          },
        };
      } else if (direction === TRANSPOSE_DIRECTION.DOWN) {
        if (lowestNote - 12 < 1) {
          return state;
        }
        return {
          ...state,
          [sequencerId]: {
            ...seq,
            notes: seq.notes.map((n: number) => n - 12),
          },
        };
      }
      return state;

    case SYNKOPATER_GLOBAL_QUANT_UPDATED:
      ({ sequencerId } = action.payload);
      const { newQuant } = action.payload;
      return {
        ...state,
        [sequencerId]: {
          ...state[sequencerId],
          playQuant: [newQuant, 0],
          stopQuant: [newQuant, newQuant],
          propQuant: [newQuant, 0],
        },
      };

    default:
      break;
  }

  return state;
};
export default sequencers;
