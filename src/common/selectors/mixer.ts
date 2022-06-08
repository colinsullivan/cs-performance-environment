import { createSelector } from "reselect";

import {
  AppState,
  createQuadTrackVM,
  createStereoTrackVM,
  MixerConfiguration,
  MixerViewModel,
  QuadTrackViewModel,
  StereoTrackViewModel,
  TrackViewModelBase,
} from "common/models";
import { getAbletonTracks } from "./ableton";
import { AbletonTrack } from "common/models/ableton/api";
import { getAbletonTracksByName } from "./ableton";

export const getMixerConfiguration = (state: AppState): MixerConfiguration =>
  state.mixerConfiguration;

export const getOrderedChannelNames = createSelector(
  [getMixerConfiguration],
  (mixerConfiguration) => mixerConfiguration.orderedChannelNames
);

export const getQuadTrackNames = createSelector(
  [getMixerConfiguration],
  (mixerConfiguration) => {
    const result = new Set();
    for (const quadTrack of mixerConfiguration.quadTrackConfigs) {
      result.add(quadTrack.frontChannelName);
      result.add(quadTrack.rearChannelName);
    }
    return result;
  }
);

const createFindByName = (track: TrackViewModelBase) => (channelName: string) =>
  channelName === track.name;

const findChannelIndex = (orderedChannelNames: string[], track: TrackViewModelBase) =>
  orderedChannelNames.findIndex(createFindByName(track));

export const getMixerViewModel = createSelector(
  [
    getAbletonTracks,
    getAbletonTracksByName,
    getMixerConfiguration,
    getQuadTrackNames,
  ],
  (
    abletonTracks,
    abletonTracksByName,
    mixerConfiguration,
    quadTrackNames
  ): MixerViewModel => {
    const { orderedChannelNames, maxChannels, quadTrackConfigs } =
      mixerConfiguration;
    const isStereoTrack = (track: AbletonTrack) =>
      !quadTrackNames.has(track.name);
    const stereoTracks: AbletonTrack[] = abletonTracks.filter(isStereoTrack);

    const stereoTrackVMs: StereoTrackViewModel[] = stereoTracks.map((t) =>
      createStereoTrackVM(t)
    );

    const quadTrackVMs: QuadTrackViewModel[] = [];
    for (const quadTrackConf of quadTrackConfigs) {
      if (quadTrackConf.frontChannelName in abletonTracksByName && quadTrackConf.rearChannelName in abletonTracksByName) {
        quadTrackVMs.push(createQuadTrackVM(
          quadTrackConf,
          abletonTracksByName[quadTrackConf.frontChannelName],
          abletonTracksByName[quadTrackConf.rearChannelName]
        ));
      }
    }

    const sortedTracks: Array<StereoTrackViewModel | QuadTrackViewModel> = [...stereoTrackVMs, ...quadTrackVMs]
      .sort(
        // Sort channels in the ordered list first, all others after
        (a, b) => {
          const aIndex = findChannelIndex(orderedChannelNames, a);
          const bIndex = findChannelIndex(orderedChannelNames, b);
          if (aIndex === -1 && bIndex === -1) {
            return 0;
          } else if (aIndex === -1 && bIndex !== -1) {
            return 1;
          } else if (aIndex !== -1 && bIndex === -1) {
            return -1;
          }
          return aIndex - bIndex;
        }
      )
      .slice(0, maxChannels);

    return { sortedTracks };
  }
);
