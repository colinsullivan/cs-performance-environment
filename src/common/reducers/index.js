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

import { WS_READYSTATE_UPDATE, STATE_REHYDRATED } from "common/actions/types";
import sequencers from "./sequencers";
import octatrack from "./octatrack";
import { createInitialSequencersState } from "common/models/sequencers";
import { createInitialComponentsState } from "common/models/components";
import components from "./components";
import holdMenus from "./holdMenus";
import createInitialHoldMenus from "common/models/menus/menus";
import scale from "./scale";
import tempo from "./tempo";

export const create_default_state = () => ({
  sequencers: createInitialSequencersState(),
  components: createInitialComponentsState(),
  holdMenus: createInitialHoldMenus(),
});

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
  holdMenus,
  scale,
  tempo
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
        ...JSON.parse(action.payload.serializedState),
      };
      break;

    default:
      break;
  }

  return newState;
};

export default rootReducer;
