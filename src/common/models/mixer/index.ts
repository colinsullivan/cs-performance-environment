import { MixerConfiguration } from "./types";

export * from "./types";

export const createEmptyMixerConfiguration = (): MixerConfiguration => ({
  orderedChannelNames: [],
  maxChannels: 0,
  pannerSends: {
    frontSendName: "sendC",
    rearSendName: "sendD",
  },
});
