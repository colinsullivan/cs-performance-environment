import { createSelector } from "reselect";

import { Sequencers } from 'common/reducers/types';
import { SynkopaterSequencer } from 'common/models/types';

export const sequencersSelector = (state : any) : Sequencers => state.sequencers;

export const getSequencerIdFromProps = (_state : any, props : { sequencerId: string }) : string => props.sequencerId;

export const getSequencer = createSelector(
  [sequencersSelector, getSequencerIdFromProps],
  (sequencers : Sequencers, sequencerId : string) : SynkopaterSequencer => sequencers[sequencerId]
);

export const getComponents = (state: any) => state.components;
