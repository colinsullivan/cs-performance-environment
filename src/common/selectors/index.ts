import { createSelector } from "reselect";
import SCRedux from "supercollider-redux";

import {
  OctatrackState,
  SynkopaterPerformanceComponent,
} from "common/models/types";
import { READY_STATES } from "common/models/ready_states";

export * from "./ableton";
export * from "./crow";
export * from "./menus";
export * from "./mixer";
export * from "./sequencers";
export * from "./tempo";

export const getPerformanceComponents = (
  state
): { [componentId: string]: SynkopaterPerformanceComponent } =>
  state.components;

export const getOctatrack = (state): OctatrackState => state.octatrack;
export const getWebsocketReadyState = (state): READY_STATES =>
  state.websocketReadyState;
export const getIsConnected = createSelector(
  [getWebsocketReadyState],
  (websocketReadyState) => websocketReadyState === READY_STATES.OPEN
);

export const getScale = (state) => state.scale;

export const getSerializedState = (state) => ({
  [SCRedux.DEFAULT_MOUNT_POINT]: state[SCRedux.DEFAULT_MOUNT_POINT],
  sequencers: state.sequencers,
  components: state.components,
  octatrack: state.octatrack,
  scale: state.scale,
});

