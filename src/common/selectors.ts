import { createSelector } from "reselect";

import { Sequencers } from 'common/reducers/types';
import { SynkopaterSequencer, PerformanceComponent, OctatrackState, SynkopaterPerformanceComponent } from 'common/models/types';

export const sequencersSelector = (state : any) : Sequencers => state.sequencers;

export const getSequencerIdFromProps = (_state : any, props : { sequencerId: string }) : string => props.sequencerId;

export const getSequencer = createSelector(
  [sequencersSelector, getSequencerIdFromProps],
  (sequencers : Sequencers, sequencerId : string) : SynkopaterSequencer => sequencers[sequencerId]
);

export const getPerformanceComponents = (state: any) : { [componentId: string]: SynkopaterPerformanceComponent } => state.components;

export const getOctatrack = (state: any) : OctatrackState => state.octatrack;
