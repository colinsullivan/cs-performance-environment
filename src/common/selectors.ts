import { createSelector } from "reselect";

import { Sequencers } from "common/reducers/types";
import {
  SynkopaterSequencer,
  OctatrackState,
  SynkopaterPerformanceComponent,
} from "common/models/types";
import { READY_STATES } from "common/models/ready_states";
import { scaleMenuId } from "common/models/menus";

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

const getHoldMenus = (state) => state.holdMenus;

export const getScaleHoldMenuIsOpen = createSelector(
  [getHoldMenus],
  (holdMenus) => holdMenus[scaleMenuId].isOpen
);
