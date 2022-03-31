import {AbletonState} from "common/models/ableton/api";
import {createSelector} from "reselect";

export const getAbleton = (state): AbletonState => state.ableton;
export const getLinkEnabled = createSelector([getAbleton], (ableton) => ableton.session.linkEnabled);
export const getIsPlaying = createSelector([getAbleton], (ableton) => ableton.session.isPlaying);
export const getTempo = createSelector([getAbleton], (ableton) => ableton.session.tempo);
