import { AnyAction, combineReducers } from "redux";
import SCRedux from "supercollider-redux";

import { READY_STATES } from "common/models/ready_states";

import { WS_READYSTATE_UPDATE, STATE_REHYDRATED } from "common/actions/types";
import sequencers from "./sequencers";
import octatrack from "./octatrack";
import components from "./components";
import holdMenus from "./holdMenus";
import scale from "./scale";
import tempo from "./tempo";
import { crowReducer } from "./crow";
import abletonReducer from "./ableton";
import { AppState } from "common/models";

export function websocketReadyState(
  state = READY_STATES.CLOSED,
  action: AnyAction
) {
  switch (action.type) {
    case WS_READYSTATE_UPDATE:
      return action.payload.readyState;
    default:
      return state;
  }
}

const combinedReducers = combineReducers<AppState>({
  // @ts-ignore
  [SCRedux.DEFAULT_MOUNT_POINT]: SCRedux.reducer,
  ableton: abletonReducer,
  components,
  crow: crowReducer,
  holdMenus,
  octatrack,
  scale,
  sequencers: (state = {}) => state,
  tempo,
  websocketReadyState,
});

const rootReducer = (state: AppState, action: AnyAction) => {
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
