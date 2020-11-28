import { SCReduxSequencer } from "supercollider-redux-sequencers";

export enum ARP_MODES {
  UP = "UP",
  DOWN = "DOWN",
  UPDOWN = "UPDOWN",
}

export enum TRANSPOSE_DIRECTION {
  UP = 1,
  DOWN = -1,
}

export interface ControllerMappingElements {
  [elementName: string]: string;
}
export interface ControllerMapping {
  [controllerName: string]: ControllerMappingElements;
}
export type PerformanceComponent = {
  id: string;
  scClassName: string;
  controllerMappings: ControllerMapping;
};
export type OctatrackState = {
  currentPatternProgramChangeValue: number | null;
};

export type PresetProps = {
  [propName: string]: any;
};

export type PerformanceComponentPreset = {
  id: string;
  octatrackPatternValue: number | null;
  props: PresetProps;
};

export type SynkopaterPerformanceComponent = PerformanceComponent & {
  sequencerId: string;
  inputBus: number;
  outputBus: number;
  parameters: {
    delayFactor: number;
    delayFeedback: number;
  };
  currentPresetId: string | null;
  presets: PerformanceComponentPreset[];
  followOctatrackPattern: boolean
};

export type SynkopaterSequencer = SCReduxSequencer & {
  dur: number;
  stretch: number;
  legato: number;
  offset: number;
  notes: number[];
  arpMode: ARP_MODES;
  euclideanNumHits: number;
  euclideanTotalNumHits: number;
  midiChan: number;
  delaySecs: number | null;
};
