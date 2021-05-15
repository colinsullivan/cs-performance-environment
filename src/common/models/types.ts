import { SCReduxSequencer, Quant } from "supercollider-redux-sequencers";

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

interface PerformanceComponentPresetProps {
  synkopaterSequencerProps: SynkopaterPresetProps;
  synkopaterComponentProps: SynkopaterComponentParams;
}

export type PerformanceComponentPreset = {
  id: string;
  octatrackPatternValue: number | null;
  props: PerformanceComponentPresetProps;
};

interface SynkopaterComponentParams {
  delayFactor: number;
  delayFeedback: number;
}

export type SynkopaterPerformanceComponent = PerformanceComponent & {
  sequencerId: string;
  inputBus: number;
  outputBus: number;
  parameters: SynkopaterComponentParams;
  currentPresetId: string | null;
  presets: PerformanceComponentPreset[];
  followOctatrackPattern: boolean;
};

export interface SynkopaterPresetProps {
  dur: number;
  stretch: number;
  legato: number;
  offset: number;
  notes: number[];
  arpMode: ARP_MODES;
  euclideanNumHits: number;
  euclideanTotalNumHits: number;
  euclidBounceEnabled: boolean;
  euclidBounceFirstDur: number;
  euclidBounceFirstBeats: number;
  euclidBounceFirstBeatsMult: number;
  euclidBounceSecondDur: number;
  euclidBounceSecondBeats: number;
  euclidBounceSecondBeatsMult: number;
  secondEuclieanNumHits: number;
  secondEuclieanTotalNumHits: number;
}

export interface SynkopaterSequencer
  extends SynkopaterPresetProps,
    SCReduxSequencer {
  midiChan: number;
  delaySecs: number | null;
  savedQuants: {
    [quantName: string]: Quant;
  };
}
