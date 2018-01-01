import _ from 'lodash';
import {combineReducers} from 'redux'
import abletonLinkRedux from "abletonlink-redux"
import awakeningSequencers from "awakening-sequencers"
import supercolliderRedux from "supercollider-redux"

import * as actionTypes from './actionTypes';

const durChoices = [1.0/128.0, 1.0/64.0, 1.0/32.0, 1.0/16.0, 1.0/8.0, 1.0/4.0, 1.0/2.0, 1.0, 2.0, 4.0, 8.0];

export const ARP_MODES = {
  UP: "UP",
  DOWN: "DOWN",
  UPDOWN: "UPDOWN"
};

// TODO: move these create methods into a model file
function create_synkopater_sequencer (id, type) {
  return Object.assign(awakeningSequencers.create_default_sequencer(id, type), {
    dur: 0.5,
    stretch: 1.0,
    legato: 1.0,
    arp_notes: [96, 84, 86, 87],
    arp_vels: [1.0, 1.0, 1.0, 1.0],
    arp_mode: ARP_MODES.UP,
    arp_updown_current_direction: 1,
    arp_note_index: 0,
    numBeats: 4
  });
}

//function create_performance_component (id) {
  //return {
    //id
  //};
//}

export function create_default_state () {
  let initialState = {
    abletonlink: abletonLinkRedux.create_default_state(),
    sequencers: {
      'synkopaterA': create_synkopater_sequencer(
        'synkopaterA',
        'SynkopaterOutboardSequencer'
      ),
      'synkopaterB': create_synkopater_sequencer(
        'synkopaterB',
        'SynkopaterOutboardSequencer'
      )
    }
  };
  Object.assign(initialState.sequencers.synkopaterA, {
  //midiOutDeviceName: "minilogue",
  //midiOutPortName: "SOUND",
    midiOutDeviceName: "(in) SuperCollider",
    midiOutPortName: "(in) SuperCollider"
  });
  Object.assign(initialState.sequencers.synkopaterB, {
    midiOutDeviceName: "(in) SuperCollider",
    midiOutPortName: "(in) SuperCollider"
  });

  console.log("initialState");
  console.log(initialState);

  return initialState;
}

function sequencers (state, action) {
  state = awakeningSequencers.reducer(state, action);
  let seq;
  switch (action.type) {
    case actionTypes.SYNKOPATER_ARP_REMOVE_NOTE:
      seq = Object.assign({}, state[action.payload.sequencerId]);

      seq.arp_notes = _.without(seq.arp_notes, action.payload.note);
      seq.numBeats = seq.arp_notes.length;

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
      seq.numBeats = seq.arp_notes.length;
      state[action.payload.sequencerId] = seq;
      state = Object.assign({}, state);
      break;

    case actionTypes.SYNKOPATER_ARP_CHANGE_MODE:
      seq = Object.assign({}, state[action.payload.sequencerId]);
      seq.arp_mode = action.payload.arp_mode;
      state[action.payload.sequencerId] = seq;
      state = Object.assign({}, state);
      break;

    case supercolliderRedux.actionTypes.SUPERCOLLIDER_EVENTSTREAMPLAYER_NEXTBEAT:
      seq = Object.assign({}, state[action.payload.id]);
      if (action.payload.id === seq.sequencerId) {
        switch (seq.arp_mode) {
          case ARP_MODES.UP:
            seq.arp_note_index = seq.beat;
            break;

          case ARP_MODES.DOWN:
            seq.arp_note_index = seq.numBeats - 1 - seq.beat;
            break;

          case ARP_MODES.UPDOWN:
            if (seq.arp_note_index === seq.numBeats - 1) {
              seq.arp_updown_current_direction = -1;
            } else if (seq.arp_note_index === 0) {
              seq.arp_updown_current_direction = 1;
            }
            seq.arp_note_index += seq.arp_updown_current_direction;

            break;
          
          default:
            break;
          
        }
        state[seq.sequencerId] = seq;
        state = Object.assign({}, state);
      }
      
      break;

    case actionTypes.SYNKOPATER_CHANGE_PARAM:
      seq = Object.assign({}, state[action.payload.sequencerId]);
      seq[action.payload.param] = action.payload.value;
      state[action.payload.sequencerId] = seq;
      state = Object.assign({}, state);
      break;

    case actionTypes.MIDI_CONTROLLER_CC:
      if (action.payload.controllerId === 'launchcontrol') {
        if (action.payload.name === 'knu1') {
          let seq = Object.assign({}, state.synkopaterA);
          let knobVal = action.payload.value;
          let selectedDurIndex = Math.round(
            knobVal * (durChoices.length - 1)
          );
          seq.dur = durChoices[selectedDurIndex];
          state.synkopaterA = seq;
          state = Object.assign({}, state);
        }
      }
      break;
    
    default:
      break;
  }
  return state;
}

function controllers (state = {}, action) {
  switch (action.type) {
    case actionTypes.MIDI_CONTROLLER_INIT:
      let controller = {};
      let mappings = action.payload.mappings;
      let controlName;
      for (const channel in mappings) {
        for (const cc in mappings[channel]) {
          controlName = mappings[channel][cc];
          controller[controlName] = 0;
        }
      }
      state[action.payload.controllerId] = controller;
      state = Object.assign({}, state);
      break;

    case actionTypes.MIDI_CONTROLLER_CC:
      state[action.payload.controllerId][action.payload.name] = action.payload.value;
      state = Object.assign({}, state);
      break;
    
    default:
      break
  }
  return state;
}


export default combineReducers({
  [abletonLinkRedux.DEFAULT_MOUNT_POINT]: abletonLinkRedux.reducer,
  [supercolliderRedux.DEFAULT_MOUNT_POINT]: supercolliderRedux.reducer,
  controllers: controllers,
  sequencers: sequencers,
});
