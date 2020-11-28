/**
 *  @file       types.ts
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

import { SequencerParamKeys } from "common/models/synkopater";
import { ARP_MODES, TRANSPOSE_DIRECTION } from "common/models/types";
import { READY_STATES } from "common/models/ready_states";
import { ControllerMappingElements } from "common/models/types";

export const SYNKOPATER_ARP_ADD_NOTE = "SYNKOPATER_ARP_ADD_NOTE";
export const SYNKOPATER_ARP_REMOVE_NOTE = "SYNKOPATER_ARP_REMOVE_NOTE";
export const SYNKOPATER_ARP_CHANGE_MODE = "SYNKOPATER_ARP_CHANGE_MODE";
export const SEQUENCER_STATE_UPDATED = "SEQUENCER_STATE_UPDATED";
export const MIDI_CONTROLLER_INIT = "MIDI_CONTROLLER_INIT";
export const MIDI_CONTROLLER_CC = "MIDI_CONTROLLER_CC";
// when instrument's parameter is updated from within (via SC's MIDI
// controller, perhaps)
export const INSTRUMENT_PARAMETER_UPDATED = "INSTRUMENT_PARAMETER_UPDATED";
export const WS_READYSTATE_UPDATE = "WS_READYSTATE_UPDATE";
// When delay time is recalculated on the SC side
export const SYNKOPATER_DELAY_TIME_UPDATE = "SYNKOPATER_DELAY_TIME_UPDATE";
export const SYNKOPATER_TRANSPOSED = "SYNKOPATER_TRANSPOSED";

export interface SynkopaterNotePayload {
  sequencerId: string;
  note: number;
}
export interface SynkopaterAddNote {
  type: typeof SYNKOPATER_ARP_ADD_NOTE;
  payload: SynkopaterNotePayload;
}
export interface SynkopaterRemoveNote {
  type: typeof SYNKOPATER_ARP_REMOVE_NOTE;
  payload: SynkopaterNotePayload;
}

export interface SynkopaterChangeMode {
  type: typeof SYNKOPATER_ARP_CHANGE_MODE;
  payload: {
    sequencerId: string;
    arpMode: ARP_MODES;
  };
}

export interface SequencerUpdateParam {
  type: typeof SEQUENCER_STATE_UPDATED;
  payload: {
    sequencerId: string;
    param: SequencerParamKeys;
    value: any;
  };
}

export interface MidiControllerCC {
  type: typeof MIDI_CONTROLLER_CC;
  payload: {
    controllerId: string;
    name: string;
    value: any;
  };
}

export interface MidiControllerInit {
  type: typeof MIDI_CONTROLLER_INIT;
  payload: {
    controllerId: string;
    mappings: ControllerMappingElements;
  };
}

export interface InstrumentParameterUpdated {
  type: typeof INSTRUMENT_PARAMETER_UPDATED;
  payload: {
    componentId: string;
    parameterId: string;
    newValue: any;
  };
}

export interface WebsocketReadyStateChanged {
  type: typeof WS_READYSTATE_UPDATE;
  payload: {
    readyState: READY_STATES;
    clientId: string;
  };
}

export interface SynkopaterTransposed {
  type: typeof SYNKOPATER_TRANSPOSED;
  payload: {
    sequencerId: string;
    direction: TRANSPOSE_DIRECTION;
  };
}

export interface SynkopaterDelayTimeUpdate {
  type: typeof SYNKOPATER_DELAY_TIME_UPDATE;
  payload: {
    sequencerId: string;
    delaySecs: number;
  };
}

export const SYNKOPATER_GLOBAL_QUANT_UPDATED =
  "SYNKOPATER_GLOBAL_QUANT_UPDATED";
export interface SynkopaterGlobalQuantUpdated {
  type: typeof SYNKOPATER_GLOBAL_QUANT_UPDATED;
  payload: {
    sequencerId: string;
    newQuant: number;
  };
}

export const OCTATRACK_PATTERN_UPDATED = "OCTATRACK_PATTERN_UPDATED";
export interface OctatrackPatternUpdated {
  type: typeof OCTATRACK_PATTERN_UPDATED;
  payload: {
    programChangeValue: number;
  };
}

export const SYNKOPATER_SAVE_PRESET = "SYNKOPATER_SAVE_PRESET";
export interface SynkopaterSavePreset {
  type: typeof SYNKOPATER_SAVE_PRESET;
  payload: {
    componentId: string;
    sequencerId: string;
    followOctatrackPattern: boolean;
  };
}

export const SYNKOPATER_UPDATE_PRESET = "SYNKOPATER_UPDATE_PRESET";
export interface SynkopaterUpdatePreset {
  type: typeof SYNKOPATER_UPDATE_PRESET;
  payload: {
    sequencerId: string;
    componentId: string;
  };
}

export type AllActionTypes =
  | SynkopaterAddNote
  | SynkopaterRemoveNote
  | SynkopaterChangeMode
  | SequencerUpdateParam
  | MidiControllerCC
  | MidiControllerInit
  | InstrumentParameterUpdated
  | WebsocketReadyStateChanged
  | SynkopaterTransposed
  | SynkopaterDelayTimeUpdate
  | SynkopaterGlobalQuantUpdated
  | OctatrackPatternUpdated
  | SynkopaterSavePreset
  | SynkopaterUpdatePreset;

export type Thunk = (
  dispatch: (action: AllActionTypes) => void,
  getState: () => any
) => void;
