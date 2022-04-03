/**
 *  @file       types.ts
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

import {
  ARP_MODES,
  TRANSPOSE_DIRECTION,
  PerformanceComponentPreset,
  SequencerGenericParamKeys,
  SequencerGenericParamValue,
  SequencerModSeqParamKey,
  MidiModSequence,
} from "common/models/types";
import { READY_STATES } from "common/models/ready_states";
import { ControllerMappingElements } from "common/models/types";

import { openHoldMenu, closeHoldMenu } from "common/actions/menus";
import { setKey } from "common/actions/scale";
import {
  CrowDeviceConnected,
  CrowStateUpdated,
  InitializeCrowDevice,
} from "./crow";
import {
  AbletonLinkDisable,
  AbletonLinkEnable,
  AbletonSessionStateUpdate,
  AbletonTrackStateUpdate,
  AbletonTransportPause,
  AbletonTransportPlay,
  AbletonUpdateTempo,
} from "./ableton";

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
    param: SequencerGenericParamKeys;
    value: SequencerGenericParamValue;
  };
}

export interface MidiControllerCC {
  type: typeof MIDI_CONTROLLER_CC;
  payload: {
    controllerId: string;
    name: string;
    value;
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
    newValue;
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
    preset: PerformanceComponentPreset;
  };
}

export const SYNKOPATER_UPDATE_PRESET = "SYNKOPATER_UPDATE_PRESET";
export interface SynkopaterUpdatePreset {
  type: typeof SYNKOPATER_UPDATE_PRESET;
  payload: {
    componentId: string;
    updatedPreset;
  };
}

export const SYNKOPATER_LOAD_PRESET = "SYNKOPATER_LOAD_PRESET";
export interface SynkopaterLoadPreset {
  type: typeof SYNKOPATER_LOAD_PRESET;
  payload: {
    componentId: string;
    sequencerId: string;
    preset: PerformanceComponentPreset;
  };
}

export const SYNKOPATER_DELETE_PRESET = "SYNKOPATER_DELETE_PRESET";
export interface SynkopaterDeletePreset {
  type: typeof SYNKOPATER_DELETE_PRESET;
  payload: {
    componentId: string;
    sequencerId: string;
    presetId: string;
  };
}

export const SYNKOPATER_TOGGLE_FOLLOW_OCTATRACK =
  "SYNKOPATER_TOGGLE_FOLLOW_OCTATRACK";
export interface SynkopaterToggleFollowOctatrack {
  type: typeof SYNKOPATER_TOGGLE_FOLLOW_OCTATRACK;
  payload: {
    componentId: string;
  };
}

export const SEQUENCER_TOGGLE_EUCLID_BOUNCE = "SEQUENCER_TOGGLE_EUCLID_BOUNCE";
export interface SequencerToggleEuclidBounce {
  type: typeof SEQUENCER_TOGGLE_EUCLID_BOUNCE;
  payload: {
    sequencerId: string;
  };
}

export const SEQUENCER_UPDATE_MOD_SEQUENCE = "SEQUENCER_UPDATE_MOD_SEQUENCE";
export interface SequencerUpdateModSequence {
  type: typeof SEQUENCER_UPDATE_MOD_SEQUENCE;
  payload: {
    sequencerId: string;
    modParam: SequencerModSeqParamKey;
    newValue: MidiModSequence;
  };
}
export const SEQUENCER_UPDATE_MOD_SEQUENCE_LENGTH =
  "SEQUENCER_UPDATE_MOD_SEQUENCE_LENGTH";
export interface SequencerUpdateModSequenceLength {
  type: typeof SEQUENCER_UPDATE_MOD_SEQUENCE_LENGTH;
  payload: {
    sequencerId: string;
    modParam: SequencerModSeqParamKey;
    newLength: number;
  };
}

export const STATE_REHYDRATED = "STATE_REHYDRATED";
export interface StateRehydrated {
  type: typeof STATE_REHYDRATED;
  payload: {
    serializedState: string;
  };
}

export const SEQUENCER_CHANGES_APPLIED_TIMEOUT =
  "SEQUENCER_CHANGES_APPLIED_TIMEOUT";
export interface SequencerChangesAppliedTimeout {
  type: typeof SEQUENCER_CHANGES_APPLIED_TIMEOUT;
  payload: {
    sequencerId: string;
    timestamp: number;
  };
}

export const SEQUENCER_RANDOMIZE_NOTES = "SEQUENCER_RANDOMIZE_NOTES";
export interface SequencerRandomizeNotes {
  type: typeof SEQUENCER_RANDOMIZE_NOTES;
  payload: {
    sequencerId: string;
    newNotes: number[];
  };
}

export const SYSTEM_TEMPO_CHANGED = "SYSTEM_TEMPO_CHANGED";
export interface SystemTempoChanged {
  type: typeof SYSTEM_TEMPO_CHANGED;
  payload: {
    tempo: number;
  };
}

export type Thunk = (
  dispatch: (action: AllActionTypes) => void,
  getState
) => void;

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
  | SynkopaterUpdatePreset
  | SynkopaterLoadPreset
  | SynkopaterToggleFollowOctatrack
  | StateRehydrated
  | SynkopaterDeletePreset
  | SequencerToggleEuclidBounce
  | ReturnType<typeof openHoldMenu>
  | ReturnType<typeof closeHoldMenu>
  | ReturnType<typeof setKey>
  | SequencerUpdateModSequence
  | SequencerUpdateModSequenceLength
  | SequencerChangesAppliedTimeout
  | SequencerRandomizeNotes
  | SystemTempoChanged
  | InitializeCrowDevice
  | CrowDeviceConnected
  | CrowStateUpdated
  | AbletonSessionStateUpdate
  | AbletonTransportPlay
  | AbletonTransportPause
  | AbletonLinkEnable
  | AbletonLinkDisable
  | AbletonUpdateTempo
  | AbletonTrackStateUpdate;
