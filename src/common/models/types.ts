import {Sequencers} from "common/reducers/types";
import SCRedux from "supercollider-redux";
import { SCReduxSequencer, Quant } from "supercollider-redux-sequencers";
import { AbletonState } from "./ableton/api";
import { CrowDevice } from "./crow/api";
import { HoldMenusState } from "./menus";
import { READY_STATES } from "./ready_states";
import { ScaleState } from "./scale";
export type SequencerGenericParamValue = number;
export const MidiCCRange = [0, 127];
export type MidiModSequence = number[];

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

export type OctatrackPatternValue = number | null;

export type OctatrackState = {
  currentPatternProgramChangeValue: OctatrackPatternValue;
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
  velocities: MidiModSequence;
  cc1: MidiModSequence;
  cc74: MidiModSequence;
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

// Defines which keys can be set directly with the SEQUENCER_STATE_UPDATED action
export type SequencerGenericParamKeys =
  | "dur"
  | "stretch"
  | "legato"
  | "offset"
  | "euclideanTotalNumHits"
  | "euclideanNumHits"
  | "euclidBounceFirstDur"
  | "euclidBounceFirstBeats"
  | "euclidBounceFirstBeatsMult"
  | "euclidBounceSecondDur"
  | "euclidBounceSecondBeats"
  | "euclidBounceSecondBeatsMult"
  | "secondEuclieanNumHits"
  | "secondEuclieanTotalNumHits";

// Defines which keys represent modulation sequences
export type SequencerModSeqParamKey = "velocities" | "cc1" | "cc74";

export interface SynkopaterSequencer
  extends SynkopaterPresetProps,
    SCReduxSequencer {
  midiChan: number;
  delaySecs: number | null;
  savedQuants: {
    [quantName: string]: Quant;
  };
  changesAppliedAt: number;
  lastUpdateId: string;
}

export interface AppState {
  [SCRedux.DEFAULT_MOUNT_POINT]: ReturnType<typeof SCRedux.reducer>;
  ableton: AbletonState;
  components: Record<string, SynkopaterPerformanceComponent>;
  crow: CrowDevice[];
  holdMenus: HoldMenusState;
  octatrack: OctatrackState;
  scale: ScaleState;
  sequencers: Sequencers;
  tempo: number;
  websocketReadyState: READY_STATES;
}
