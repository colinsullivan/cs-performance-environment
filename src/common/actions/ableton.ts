import { AbletonSession, AbletonTrack } from "common/models/ableton/api";
import {getAbletonTracksByName} from "common/selectors";

export const ABLETON_SESSION_STATE_UPDATE = "ABLETON_SESSION_STATE_UPDATE";
export interface AbletonSessionStateUpdate {
  type: typeof ABLETON_SESSION_STATE_UPDATE;
  payload: AbletonSession;
}

export const abletonSessionStateUpdate = (
  payload: AbletonSession
): AbletonSessionStateUpdate => ({
  type: ABLETON_SESSION_STATE_UPDATE,
  payload,
});

export const ABLETON_TRACK_STATE_UPDATE = "ABLETON_TRACK_STATE_UPDATE";
export interface AbletonTrackStateUpdate {
  type: typeof ABLETON_TRACK_STATE_UPDATE;
  payload: AbletonTrack;
}
export const abletonTrackStateUpdate = (payload: AbletonTrack) => ({
  type: ABLETON_TRACK_STATE_UPDATE,
  payload,
});

export const ABLETON_TRACK_INIT = "ABLETON_TRACK_INIT";
export interface AbletonTrackInit {
  type: typeof ABLETON_TRACK_INIT;
  payload: AbletonTrack;
}
export const abletonTrackInit = (payload: AbletonTrack) => ({
  type: ABLETON_TRACK_INIT,
  payload
});

export const handleAbletonTrackStateUpdate = (payload: AbletonTrack) => (dispatch, getState) => {
  const state = getState();

  const tracksByName = getAbletonTracksByName(state);

  const trackName = payload.name;
  const trackIsNew = !(trackName in tracksByName);

  // If the track is being created, dispatches an init for the track,
  // otherwise dispatches an update.
  if (trackIsNew) {
    dispatch(abletonTrackInit(payload));
    return;
  }
  dispatch(abletonTrackStateUpdate(payload));
};

export const ABLETON_TRANSPORT_PAUSE = "ABLETON_TRANSPORT_PAUSE";
export interface AbletonTransportPause {
  type: typeof ABLETON_TRANSPORT_PAUSE;
}
export const abletonTransportPause = () => ({
  type: ABLETON_TRANSPORT_PAUSE,
});

export const ABLETON_TRANSPORT_PLAY = "ABLETON_TRANSPORT_PLAY";
export interface AbletonTransportPlay {
  type: typeof ABLETON_TRANSPORT_PLAY;
}
export const abletonTransportPlay = () => ({
  type: ABLETON_TRANSPORT_PLAY,
});

export const ABLETON_UPDATE_TEMPO = "ABLETON_UPDATE_TEMPO";
export interface AbletonUpdateTempo {
  type: typeof ABLETON_UPDATE_TEMPO;
  payload: {
    tempo: number;
  };
}
export const abletonUpdateTempo = (tempo: number) => ({
  type: ABLETON_UPDATE_TEMPO,
  payload: {
    tempo,
  },
});

export const ABLETON_LINK_ENABLE = "ABLETON_LINK_ENABLE";
export interface AbletonLinkEnable {
  type: typeof ABLETON_LINK_ENABLE;
}
export const abletonLinkEnable = () => ({
  type: ABLETON_LINK_ENABLE,
});

export const ABLETON_LINK_DISABLE = "ABLETON_LINK_DISABLE";
export interface AbletonLinkDisable {
  type: typeof ABLETON_LINK_DISABLE;
}
export const abletonLinkDisable = () => ({
  type: ABLETON_LINK_DISABLE,
});
