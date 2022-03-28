import {keyBy} from "lodash";
import {createSelector} from "reselect";

import {AbletonState} from "common/models/ableton/api";

export const getAbleton = (state): AbletonState => state.ableton;
export const getLinkEnabled = createSelector([getAbleton], (ableton) => ableton.session.linkEnabled);
export const getIsPlaying = createSelector([getAbleton], (ableton) => ableton.session.isPlaying);
export const getAbletonTempo = createSelector([getAbleton], (ableton) => ableton.session.tempo);

export const getAbletonTracks = createSelector([getAbleton], (ableton) => ableton.tracks);
export const getAbletonTracksByName = createSelector([getAbletonTracks], (tracks) => keyBy(tracks, "name"));
