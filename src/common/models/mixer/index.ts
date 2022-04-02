import { MixerConfiguration } from "./types";

export * from "./types";

export const createEmptyMixerConfiguration = (): MixerConfiguration => ({
  orderedChannelNames: [],
  maxChannels: 0,
});
