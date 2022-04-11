import { createSelector } from "reselect";
import SCRedux from "supercollider-redux";

import { Sequencers } from "common/reducers/types";
import {
  SynkopaterSequencer,
  OctatrackState,
  SynkopaterPerformanceComponent,
} from "common/models/types";
import { READY_STATES } from "common/models/ready_states";

export * from "./ableton";
export * from "./crow";
export * from "./menus";
export * from "./mixer";

export const sequencersSelector = (state): Sequencers => state.sequencers;

export const getSequencerIdFromProps = (
  _state,
  props: { sequencerId: string }
): string => props.sequencerId;

export const getSequencer = createSelector(
  [sequencersSelector, getSequencerIdFromProps],
  (sequencers: Sequencers, sequencerId: string): SynkopaterSequencer =>
    sequencers[sequencerId]
);

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
export const getTempo = (state) => state.tempo;

