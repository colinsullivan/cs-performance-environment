import { AbletonSession, AbletonTrack } from "common/models/ableton/api";

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
  payload: { track: AbletonTrack; isNew: boolean };
}
export const abletonTrackStateUpdate = (
  track: AbletonTrack,
  tracksByName: Record<string, AbletonTrack>
) => ({
  type: ABLETON_TRACK_STATE_UPDATE,
  payload: {
    track,
    tracksByName,
  },
});

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

export const ABLETON_UPDATE_TRACK = "ABLETON_UPDATE_TRACK";
export interface AbletonUpdateTrack {
  type: typeof ABLETON_UPDATE_TRACK;
  payload: {
    track: AbletonTrack;
  };
}
export const abletonTrackUpdate = (track: AbletonTrack) => ({
  type: ABLETON_UPDATE_TRACK,
  payload: {
    track,
  },
});

export const handleTrackVolumeChanged =
  (track: AbletonTrack, value: number) => (dispatch) => {
    const updatedTrack = {
      ...track,
      volume: {
        ...track.volume,
        value,
      },
    };
    dispatch(abletonTrackUpdate(updatedTrack));
  };
