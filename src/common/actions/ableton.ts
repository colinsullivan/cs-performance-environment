import { updateDeviceParamValue } from "common/models";
import {
  AbletonDeviceParamName,
  AbletonSession,
  AbletonTrack,
  QuadPannerValue,
} from "common/models/ableton/api";
import { getMixerConfiguration } from "common/selectors";
import { debounce } from "lodash";

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
  payload: { track: AbletonTrack };
}
export const abletonTrackStateUpdate = (
  track: AbletonTrack
): AbletonTrackStateUpdate => ({
  type: ABLETON_TRACK_STATE_UPDATE,
  payload: {
    track,
  },
});

export const ABLETON_TRANSPORT_PAUSE = "ABLETON_TRANSPORT_PAUSE";
export interface AbletonTransportPause {
  type: typeof ABLETON_TRANSPORT_PAUSE;
}
export const abletonTransportPause = (): AbletonTransportPause => ({
  type: ABLETON_TRANSPORT_PAUSE,
});

export const ABLETON_TRANSPORT_PLAY = "ABLETON_TRANSPORT_PLAY";
export interface AbletonTransportPlay {
  type: typeof ABLETON_TRANSPORT_PLAY;
}
export const abletonTransportPlay = (): AbletonTransportPlay => ({
  type: ABLETON_TRANSPORT_PLAY,
});

export const ABLETON_UPDATE_TEMPO = "ABLETON_UPDATE_TEMPO";
export interface AbletonUpdateTempo {
  type: typeof ABLETON_UPDATE_TEMPO;
  payload: {
    tempo: number;
  };
}
export const abletonUpdateTempo = (tempo: number): AbletonUpdateTempo => ({
  type: ABLETON_UPDATE_TEMPO,
  payload: {
    tempo,
  },
});

const handleTempoUpdatedDebounced = debounce((dispatch, tempo: number) => {
  dispatch(abletonUpdateTempo(tempo));
}, 50, { trailing: true });

export const handleTempoUpdated = (tempo: number) => (dispatch) => {
  handleTempoUpdatedDebounced(dispatch, tempo);
};

export const ABLETON_LINK_ENABLE = "ABLETON_LINK_ENABLE";
export interface AbletonLinkEnable {
  type: typeof ABLETON_LINK_ENABLE;
}
export const abletonLinkEnable = (): AbletonLinkEnable => ({
  type: ABLETON_LINK_ENABLE,
});

export const ABLETON_LINK_DISABLE = "ABLETON_LINK_DISABLE";
export interface AbletonLinkDisable {
  type: typeof ABLETON_LINK_DISABLE;
}
export const abletonLinkDisable = (): AbletonLinkDisable => ({
  type: ABLETON_LINK_DISABLE,
});

export const ABLETON_UPDATE_TRACK = "ABLETON_UPDATE_TRACK";
export interface AbletonUpdateTrack {
  type: typeof ABLETON_UPDATE_TRACK;
  payload: {
    track: AbletonTrack;
  };
}
export const abletonTrackUpdate = (
  track: AbletonTrack
): AbletonUpdateTrack => ({
  type: ABLETON_UPDATE_TRACK,
  payload: {
    track,
  },
});

export const handleTrackDeviceParamValueChanged =
  (
    track: AbletonTrack,
    deviceParamName: AbletonDeviceParamName,
    value: number
  ) =>
  (dispatch) => {
    const updatedTrack = {
      ...track,
      [deviceParamName]: updateDeviceParamValue(track[deviceParamName], value),
    };
    dispatch(abletonTrackUpdate(updatedTrack));
  };

export const handleTrackMuted = (track: AbletonTrack) => (dispatch) => {
  const updatedTrack = {
    ...track,
    mute: true,
  };
  dispatch(abletonTrackUpdate(updatedTrack));
};

export const handleTrackUnmuted = (track: AbletonTrack) => (dispatch) => {
  const updatedTrack = {
    ...track,
    mute: false,
  };
  dispatch(abletonTrackUpdate(updatedTrack));
};

export const handleTrackPannerValueChanged =
  (track: AbletonTrack, value: QuadPannerValue) => (dispatch, getState) => {
    const mixerConfiguration = getMixerConfiguration(getState());

    const updatedPan = updateDeviceParamValue(track.panning, value.pannerValue);
    const updatedFrontSend = updateDeviceParamValue(
      track[mixerConfiguration.pannerSends.frontSendName],
      value.frontSendValue
    );
    const updatedRearSend = updateDeviceParamValue(
      track[mixerConfiguration.pannerSends.rearSendName],
      value.rearSendValue
    );
    const updatedTrack = {
      ...track,
      panning: updatedPan,
      [mixerConfiguration.pannerSends.frontSendName]: updatedFrontSend,
      [mixerConfiguration.pannerSends.rearSendName]: updatedRearSend,
    };
    dispatch(abletonTrackUpdate(updatedTrack));
  };
