import { AbletonSendName } from "../ableton/api";

export interface MixerConfiguration {
  orderedChannelNames: string[];
  maxChannels: number;
  pannerSends: {
    frontSendName: AbletonSendName;
    rearSendName: AbletonSendName;
  };
}
