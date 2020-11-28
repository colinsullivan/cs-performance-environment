/**
 *  @file       reducers.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

import { combineReducers } from "redux";
import SCRedux from "supercollider-redux";

import { READY_STATES } from "common/models/ready_states";

import {
  MIDI_CONTROLLER_INIT,
  MIDI_CONTROLLER_CC,
  INSTRUMENT_PARAMETER_UPDATED,
  WS_READYSTATE_UPDATE,
  SYNKOPATER_SAVE_PRESET
} from "common/actions/types";
import {
  create_synkopater_sequencer,
  create_synkopater_component,
} from "common/models";
import sequencers from "./sequencers";
import octatrack from './octatrack';

export function create_default_state() {
  const initialState = {
    sequencers: {
      synkopaterA: create_synkopater_sequencer(
        "synkopaterA",
        "SynkopaterOutboardSequencer",
        0
      ),
      synkopaterB: create_synkopater_sequencer(
        "synkopaterB",
        "SynkopaterOutboardSequencer",
        1
      ),
    },
    components: {
      synkopaterA: create_synkopater_component("synkopaterA", 28, 28),
      synkopaterB: create_synkopater_component("synkopaterB", 32, 32),
    },
  };
  Object.assign(initialState.sequencers.synkopaterA, {
    midiOutDeviceName: "(in) SuperCollider",
    midiOutPortName: "(in) SuperCollider",
  });
  Object.assign(initialState.sequencers.synkopaterB, {
    midiOutDeviceName: "(in) SuperCollider",
    midiOutPortName: "(in) SuperCollider",
  });

  return initialState;
}

function controllers(state = {}, action) {
  switch (action.type) {
    case MIDI_CONTROLLER_INIT:
      const controller = {};
      const mappings = action.payload.mappings;
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

    case MIDI_CONTROLLER_CC:
      state[action.payload.controllerId][action.payload.name] =
        action.payload.value;
      state = Object.assign({}, state);
      break;

    default:
      break;
  }
  return state;
}

function components(state = {}, action) {
  switch (action.type) {
    case INSTRUMENT_PARAMETER_UPDATED:
      const payload = action.payload;
      const instr = state[payload.componentId];
      if (instr.parameters[payload.parameterId] !== payload.newValue) {
        return {
          ...state,
          ...{
            [payload.componentId]: {
              ...instr,
              ...{
                parameters: {
                  ...instr.parameters,
                  ...{
                    [payload.parameterId]: payload.newValue,
                  },
                },
              },
            },
          },
        };
      } else {
        return state;
      }

    case SYNKOPATER_SAVE_PRESET: {
      const { componentId, preset } = action.payload;
      const component = state[componentId];
      return {
        ...state,
        [componentId]: {
          ...component,
          currentPresetId: preset.id,
          presets: component.presets.concat([preset])
        }
      };
    }


    default:
      return state;
  }
}

export function websocketReadyState(state = READY_STATES.CLOSED, action) {
  switch (action.type) {
    case WS_READYSTATE_UPDATE:
      return action.payload.readyState;
    default:
      return state;
  }
}

export default combineReducers({
  [SCRedux.DEFAULT_MOUNT_POINT]: SCRedux.reducer,
  controllers,
  sequencers,
  components,
  websocketReadyState,
  octatrack
});
