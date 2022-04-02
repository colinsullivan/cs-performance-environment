import { createSelector } from "reselect";

import { AppState, MixerConfiguration } from "common/models";
import { getAbletonTracks } from "./ableton";
import { AbletonTrack } from "common/models/ableton/api";

export const getMixerConfiguration = (state: AppState): MixerConfiguration =>
  state.mixerConfiguration;

export const getOrderedChannelNames = createSelector(
  [getMixerConfiguration],
  (mixerConfiguration) => mixerConfiguration.orderedChannelNames
);

const createFindByName = (track: AbletonTrack) => (channelName: string) =>
  channelName === track.name;

const findChannelIndex = (orderedChannelNames: string[], track: AbletonTrack) =>
  orderedChannelNames.findIndex(createFindByName(track));

export const getAbletonTracksOrdered = createSelector(
  [getAbletonTracks, getMixerConfiguration],
  (abletonTracks, { orderedChannelNames, maxChannels }) =>
    [...abletonTracks]
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
      .slice(0, maxChannels)
);
