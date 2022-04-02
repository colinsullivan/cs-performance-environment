import { AbletonSession, AbletonState, AbletonDeviceParamName } from "./api";

export const allAbletonDeviceParamNames: AbletonDeviceParamName[] = [
  "panning",
  "volume",
  "sendA",
  "sendB",
];

export const createAbletonSession = (): AbletonSession => ({
  linkEnabled: false,
  isPlaying: false,
  tempo: 60.0,
});

export const createAbletonState = (): AbletonState => ({
  session: createAbletonSession(),
  tracks: [],
});
