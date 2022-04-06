import {
  AbletonSession,
  AbletonState,
  AbletonDeviceParamName,
  AbletonDeviceParameter,
} from "./api";

export * from "./api";

export const allAbletonDeviceParamNames: AbletonDeviceParamName[] = [
  "panning",
  "volume",
  "sendA",
  //"sendB",
  //"sendC",
  "sendD",
  "sendE",
  "sendF",
  "sendG",
  "sendH",
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

export const updateDeviceParamValue = (
  param: AbletonDeviceParameter,
  value: number
): AbletonDeviceParameter => ({
  ...param,
  value,
});
