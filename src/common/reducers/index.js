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
  SYNKOPATER_SAVE_PRESET,
  SYNKOPATER_LOAD_PRESET,
  SYNKOPATER_UPDATE_PRESET,
  OCTATRACK_PATTERN_UPDATED,
  SYNKOPATER_TOGGLE_FOLLOW_OCTATRACK,
  STATE_REHYDRATED
} from "common/actions/types";
import {
  create_synkopater_sequencer,
  create_synkopater_component,
  applyPresetToSynkopaterComponent,
  findPresetForOctatrackPattern,
} from "common/models";
import sequencers from "./sequencers";
import octatrack from "./octatrack";

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

//function controllers(state = {}, action) {
  //switch (action.type) {
    //case MIDI_CONTROLLER_INIT:
      //const controller = {};
      //const mappings = action.payload.mappings;
      //let controlName;
      //for (const channel in mappings) {
        //for (const cc in mappings[channel]) {
          //controlName = mappings[channel][cc];
          //controller[controlName] = 0;
        //}
      //}
      //state[action.payload.controllerId] = controller;
      //state = Object.assign({}, state);
      //break;

    //case MIDI_CONTROLLER_CC:
      //state[action.payload.controllerId][action.payload.name] =
        //action.payload.value;
      //state = Object.assign({}, state);
      //break;

    //default:
      //break;
  //}
  //return state;
//}

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
          presets: component.presets.concat([preset]),
        },
      };
    }

    case SYNKOPATER_LOAD_PRESET: {
      const { componentId, preset } = action.payload;
      const component = {
        ...applyPresetToSynkopaterComponent(state[componentId], preset),
        currentPresetId: preset.id,
      };

      return {
        ...state,
        [componentId]: component,
      };
    }

    case SYNKOPATER_UPDATE_PRESET: {
      const { componentId, updatedPreset } = action.payload;
      const component = state[componentId];
      return {
        ...state,
        [componentId]: {
          ...component,
          presets: component.presets.map((p) => {
            if (p.id === updatedPreset.id) {
              return updatedPreset;
            }
            return p;
          }),
        },
      };
    }
    case OCTATRACK_PATTERN_UPDATED: {
      let newState = state;
      const { programChangeValue } = action.payload;
      for (const componentId of Object.keys(state)) {
        const component = state[componentId];

        const presetForPattern = findPresetForOctatrackPattern(
          programChangeValue,
          component
        );
        if (presetForPattern && component.followOctatrackPattern) {
          newState = {
            ...newState,
            [componentId]: {
              ...applyPresetToSynkopaterComponent(component, presetForPattern),
              currentPresetId: presetForPattern.id,
            },
          };
        }
      }
      return newState;
    }
    case SYNKOPATER_TOGGLE_FOLLOW_OCTATRACK: {
      const { componentId } = action.payload;
      return {
        ...state,
        [componentId]: {
          ...state[componentId],
          followOctatrackPattern: !state[componentId].followOctatrackPattern
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

const combinedReducers = combineReducers({
  [SCRedux.DEFAULT_MOUNT_POINT]: SCRedux.reducer,
  //controllers,
  sequencers: (state = {}) => state,
  components,
  websocketReadyState,
  octatrack,
});

const rootReducer = (state, action) => {
  let newState = combinedReducers(state, action);

  const newSequencers = sequencers(state.sequencers, action, newState);
  if (newSequencers !== state.sequencers) {
    newState = {
      ...newState,
      sequencers: newSequencers,
    };
  }

  switch (action.type) {
    case STATE_REHYDRATED:
      newState = {
        ...newState,
        ...JSON.parse(action.payload.serializedState)
      };
    
    default:
      break;
  }

  return newState;
};

export default rootReducer;
