import {
  ABLETON_SESSION_STATE_UPDATE,
  AllActionTypes,
  ABLETON_TRACK_STATE_UPDATE,
} from "common/actions";
import { AppState } from "common/models/types";
import { createAbletonState } from "common/models/ableton";
import { AbletonState } from "common/models/ableton/api";
import { getAbletonTracksById } from "common/selectors";

const abletonReducer = (
  state: AbletonState = createAbletonState(),
  action: AllActionTypes,
  allState: AppState
) => {
  switch (action.type) {
    case ABLETON_SESSION_STATE_UPDATE:
      return {
        ...state,
        session: action.payload,
      };
    case ABLETON_TRACK_STATE_UPDATE:
      {
        const tracksByName = getAbletonTracksById(allState);
        const existingTrack = tracksByName[action.payload.track.id];
        const isNew = !existingTrack;
        if (isNew) {
          return {
            ...state,
            tracks: [...state.tracks, action.payload.track],
          };
        }
        return {
          ...state,
          tracks: state.tracks.map((t) => {
            if (t.id === action.payload.track.id) {
              return action.payload.track;
            }
            return t;
          }),
        };
      }
    default:
      return state;
  }
};

export default abletonReducer;
