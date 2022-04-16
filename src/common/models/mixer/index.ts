import { AbletonTrack } from "../ableton";
import {
  MixerConfiguration,
  QuadTrackConfig,
  QuadTrackViewModel,
  StereoTrackViewModel,
  TrackViewModel,
} from "./types";

export * from "./types";

export const createQuadTrackConfig = (
  name: string,
  frontChannelName: string,
  rearChannelName: string
): QuadTrackConfig => ({
  name,
  frontChannelName,
  rearChannelName,
});

export const createEmptyMixerConfiguration = (): MixerConfiguration => ({
  orderedChannelNames: [],
  maxChannels: 0,
  pannerSends: {
    frontSendName: "sendC",
    rearSendName: "sendD",
  },
  quadTrackConfigs: [],
});

export const createStereoTrackVM = (
  track: AbletonTrack
): StereoTrackViewModel => ({
  name: track.name,
  trackType: "stereo",
  track,
});

export const createQuadTrackVM = (
  config: QuadTrackConfig,
  frontTrack: AbletonTrack,
  rearTrack: AbletonTrack
): QuadTrackViewModel => ({
  name: config.name,
  trackType: "quad",
  frontTrack,
  rearTrack,
});

// When a single track is needed from the TrackViewModel, for displaying values
export const getCanonicalTrack = (trackView: TrackViewModel) =>
  trackView.trackType === "stereo" ? trackView.track : trackView.frontTrack;

// When all the tracks are needed for updating values
export const getTracksToUpdate = (trackView: TrackViewModel): AbletonTrack[] =>
  trackView.trackType === "stereo"
    ? [trackView.track]
    : [trackView.frontTrack, trackView.rearTrack];
