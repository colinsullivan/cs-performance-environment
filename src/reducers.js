import _ from 'lodash';
import {combineReducers} from 'redux'
import abletonLinkRedux from "abletonlink-redux"
import awakeningSequencers from "awakening-sequencers"
import supercolliderRedux from "supercollider-redux"

import * as actionTypes from './actionTypes';

function create_synkopater_sequencer (id, type) {
  return Object.assign(awakeningSequencers.create_default_sequencer(id, type), {
    midiOutDeviceName: "minilogue",
    midiOutPortName: "SOUND",
    arp_dur: 0.5,
    arp_notes: [96, 84, 86, 87],
    arp_vels: [1.0, 1.0, 1.0, 1.0]
  });
}

export function create_default_state () {
  return {
    abletonlink: abletonLinkRedux.create_default_state(),
    sequencers: {
      'synkopaterA': create_synkopater_sequencer(
        'synkopaterA',
        'SynkopaterOutboardSequencer'
      )
    }
  }
}

function sequencers (state, action) {
  state = awakeningSequencers.reducer(state, action);
  let seq;
  switch (action.type) {
    case actionTypes.SYNKOPATER_ARP_REMOVE_NOTE:
      seq = Object.assign({}, state[action.payload.sequencerId]);

      seq.arp_notes = _.without(seq.arp_notes, action.payload.note);

      state[action.payload.sequencerId] = seq;
      state = Object.assign({}, state);
      break;

    case actionTypes.SYNKOPATER_ARP_ADD_NOTE:
      seq = Object.assign({}, state[action.payload.sequencerId]);
      seq.arp_notes.splice(
        _.sortedIndex(seq.arp_notes, action.payload.note),
        0,
        action.payload.note
      );
      state[action.payload.sequencerId] = seq;
      state = Object.assign({}, state);
      break;
    
    default:
      break;
  }
  return state;
}

export default combineReducers({
  [abletonLinkRedux.DEFAULT_MOUNT_POINT]: abletonLinkRedux.reducer,
  [supercolliderRedux.DEFAULT_MOUNT_POINT]: supercolliderRedux.reducer,
  sequencers: sequencers
});
