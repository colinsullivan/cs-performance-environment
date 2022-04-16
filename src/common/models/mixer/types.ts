import { AbletonSendName, AbletonTrack } from "../ableton/api";

export interface QuadTrackConfig {
  name: string;
  frontChannelName: string;
  rearChannelName: string;
}

export type TrackType = "stereo" | "quad";
export interface TrackViewModelBase {
  name: string;
  trackType: TrackType;
}
export interface QuadTrackViewModel extends TrackViewModelBase {
  trackType: "quad";
  frontTrack: AbletonTrack;
  rearTrack: AbletonTrack;
}
export interface StereoTrackViewModel extends TrackViewModelBase {
  trackType: "stereo";
  track: AbletonTrack;
}

export type TrackViewModel = QuadTrackViewModel | StereoTrackViewModel;

export interface MixerConfiguration {
  orderedChannelNames: string[];
  maxChannels: number;
  pannerSends: {
    frontSendName: AbletonSendName;
    rearSendName: AbletonSendName;
  };
  quadTrackConfigs: QuadTrackConfig[];
}

export interface MixerViewModel {
  sortedTracks: Array<TrackViewModel>;
}
