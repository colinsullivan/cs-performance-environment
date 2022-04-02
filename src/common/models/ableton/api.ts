export interface AbletonSession {
  linkEnabled: boolean;
  isPlaying: boolean;
  tempo: number;
}

export interface AbletonDeviceParameter {
  id: string;
  max: number;
  min: number;
  value: number;
  name: number;
  originalName: number;
}

export type AbletonSendName = "sendA" | "sendB";
export type AbletonDeviceParamName = "panning" | "volume" | "sendA" | "sendB";

export interface AbletonTrack {
  id: string;
  mute: boolean;
  name: string;
  panning: AbletonDeviceParameter;
  volume: AbletonDeviceParameter;
  sendA: AbletonDeviceParameter;
  sendB: AbletonDeviceParameter;
  //sendC: AbletonDeviceParameter;
  //sendD: AbletonDeviceParameter;
}

export interface AbletonState {
  session: AbletonSession;
  tracks: AbletonTrack[];
}