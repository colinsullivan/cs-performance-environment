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

export type AbletonSendName = "sendA" | "sendB" | "sendC" | "sendD" | "sendE" | "sendF" | "sendG" | "sendH";
export type AbletonDeviceParamName = "panning" | "volume" | AbletonSendName;

export interface AbletonTrack {
  id: string;
  mute: boolean;
  name: string;
  panning: AbletonDeviceParameter;
  volume: AbletonDeviceParameter;
  sendA: AbletonDeviceParameter;
  sendB: AbletonDeviceParameter;
  sendC: AbletonDeviceParameter;
  sendD: AbletonDeviceParameter;
  sendE: AbletonDeviceParameter;
  sendF: AbletonDeviceParameter;
  sendG: AbletonDeviceParameter;
  sendH: AbletonDeviceParameter;
}

export interface AbletonState {
  session: AbletonSession;
  tracks: AbletonTrack[];
}

export interface QuadPannerValue {
  frontSendValue: number;
  rearSendValue: number;
  pannerValue: number;
}

