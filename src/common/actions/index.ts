/**
 *  @file       actions.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

import {
  SYNKOPATER_ARP_ADD_NOTE,
  SynkopaterAddNote,
  SYNKOPATER_ARP_REMOVE_NOTE,
  SynkopaterRemoveNote,
  SYNKOPATER_ARP_CHANGE_MODE,
  SynkopaterChangeMode,
  SEQUENCER_STATE_UPDATED,
  SequencerUpdateParam,
  MIDI_CONTROLLER_CC,
  MidiControllerCC,
  MIDI_CONTROLLER_INIT,
  MidiControllerInit,
  INSTRUMENT_PARAMETER_UPDATED,
  InstrumentParameterUpdated,
  WS_READYSTATE_UPDATE,
  WebsocketReadyStateChanged,
  SYNKOPATER_TRANSPOSED,
  SynkopaterTransposed,
  SYNKOPATER_GLOBAL_QUANT_UPDATED,
  SynkopaterGlobalQuantUpdated,
  SYNKOPATER_SAVE_PRESET,
  SYNKOPATER_UPDATE_PRESET,
  Thunk,
  SYNKOPATER_LOAD_PRESET,
  SYNKOPATER_TOGGLE_FOLLOW_OCTATRACK,
  SynkopaterToggleFollowOctatrack,
  STATE_REHYDRATED,
  StateRehydrated,
  SYNKOPATER_DELETE_PRESET,
  SequencerToggleEuclidBounce,
  SEQUENCER_TOGGLE_EUCLID_BOUNCE,
  SequencerUpdateModSequence,
  SEQUENCER_UPDATE_MOD_SEQUENCE,
  SequencerUpdateModSequenceLength,
  SEQUENCER_UPDATE_MOD_SEQUENCE_LENGTH,
  SequencerChangesAppliedTimeout,
  SEQUENCER_CHANGES_APPLIED_TIMEOUT,
  SequencerRandomizeNotes,
  SEQUENCER_RANDOMIZE_NOTES,
} from "./types";

import {
  synkopaterToPresetProps,
  randomizeSequencerNotes,
} from "common/models/synkopater";
import { create_synkopater_preset } from "common/models/performance_component";
import {
  ARP_MODES,
  TRANSPOSE_DIRECTION,
  PerformanceComponentPreset,
  SynkopaterPerformanceComponent,
  SequencerGenericParamKeys,
  SequencerGenericParamValue,
  SequencerModSeqParamKey,
  SynkopaterSequencer,
  MidiModSequence,
} from "common/models/types";
import { READY_STATES } from "common/models/ready_states";
import { ControllerMappingElements } from "common/models/types";
import {
  getPerformanceComponents,
  getSequencer,
  getOctatrack,
  getSerializedState,
  getScale,
} from "common/selectors";
import { getPatternValue } from "common/models/octatrack";

export * from "./ableton";
export * from "./menus";
export * from "./scale";
export * from "./types";

export function synkopater_arp_add_note(
  sequencerId: string,
  note: number
): SynkopaterAddNote {
  return {
    type: SYNKOPATER_ARP_ADD_NOTE,
    payload: {
      sequencerId,
      note,
    },
  };
}

export function synkopater_arp_remove_note(
  sequencerId: string,
  note: number
): SynkopaterRemoveNote {
  return {
    type: SYNKOPATER_ARP_REMOVE_NOTE,
    payload: {
      sequencerId,
      note,
    },
  };
}

export function synkopater_arp_change_mode(
  sequencerId: string,
  arpMode: ARP_MODES
): SynkopaterChangeMode {
  return {
    type: SYNKOPATER_ARP_CHANGE_MODE,
    payload: {
      sequencerId,
      arpMode,
    },
  };
}

export function sequencer_update_param(
  sequencerId: string,
  param: SequencerGenericParamKeys,
  value: SequencerGenericParamValue
): SequencerUpdateParam {
  return {
    type: SEQUENCER_STATE_UPDATED,
    payload: {
      sequencerId,
      param,
      value,
    },
  };
}

export function midi_controller_cc(
  controllerId: string,
  name: string,
  value
): MidiControllerCC {
  return {
    type: MIDI_CONTROLLER_CC,
    payload: {
      controllerId,
      name,
      value,
    },
  };
}

export function midi_controller_init(
  controllerId: string,
  mappings: ControllerMappingElements
): MidiControllerInit {
  return {
    type: MIDI_CONTROLLER_INIT,
    payload: {
      controllerId,
      mappings,
    },
  };
}

export function instrument_parameter_updated(
  componentId: string,
  parameterId: string,
  newValue
): InstrumentParameterUpdated {
  return {
    type: INSTRUMENT_PARAMETER_UPDATED,
    payload: {
      componentId,
      parameterId,
      newValue,
    },
  };
}

export function websocketReadyStateChanged(
  readyState: READY_STATES,
  clientId: string
): WebsocketReadyStateChanged {
  return {
    type: WS_READYSTATE_UPDATE,
    payload: { readyState, clientId },
  };
}

export function synkopater_transposed(
  sequencerId: string,
  direction: TRANSPOSE_DIRECTION
): SynkopaterTransposed {
  return {
    type: SYNKOPATER_TRANSPOSED,
    payload: {
      sequencerId,
      direction,
    },
  };
}

export function synkopater_global_quant_updated(
  sequencerId: string,
  newQuant: number
): SynkopaterGlobalQuantUpdated {
  return {
    type: SYNKOPATER_GLOBAL_QUANT_UPDATED,
    payload: {
      sequencerId,
      newQuant,
    },
  };
}

export const synkopater_save_preset = (componentId: string): Thunk => {
  return (dispatch, getState) => {
    const component = getPerformanceComponents(getState())[
      componentId
    ] as SynkopaterPerformanceComponent;
    const { sequencerId } = component;
    const sequencer = getSequencer(getState(), { sequencerId });
    const octatrack = getOctatrack(getState());
    const props = synkopaterToPresetProps(component, sequencer);
    const preset = create_synkopater_preset(octatrack, props);
    dispatch({
      type: SYNKOPATER_SAVE_PRESET,
      payload: {
        componentId,
        preset,
      },
    });
  };
};

export const synkopater_update_preset = (componentId: string): Thunk => {
  return (dispatch, getState) => {
    const component = getPerformanceComponents(getState())[
      componentId
    ] as SynkopaterPerformanceComponent;
    const { sequencerId, currentPresetId } = component;
    const sequencer = getSequencer(getState(), { sequencerId });
    const octatrack = getOctatrack(getState());
    const preset = component.presets.find(
      (p: PerformanceComponentPreset) => p.id === currentPresetId
    );
    if (!preset) {
      throw new Error(`No current preset for component ${componentId}`);
    }
    const updatedPreset = {
      id: preset.id,
      props: synkopaterToPresetProps(component, sequencer),
      octatrackPatternValue: getPatternValue(octatrack),
    };
    dispatch({
      type: SYNKOPATER_UPDATE_PRESET,
      payload: {
        componentId,
        updatedPreset,
      },
    });
  };
};

export const synkopater_load_preset = (
  componentId: string,
  presetId: string
): Thunk => {
  return (dispatch, getState) => {
    const component = getPerformanceComponents(getState())[
      componentId
    ] as SynkopaterPerformanceComponent;
    const { sequencerId } = component;
    const preset = component.presets.find(
      (p: PerformanceComponentPreset) => p.id === presetId
    );
    if (!preset) {
      throw new Error(`Cannot load preset ${presetId}!`);
    }
    dispatch({
      type: SYNKOPATER_LOAD_PRESET,
      payload: {
        componentId,
        sequencerId,
        preset,
      },
    });
  };
};

export const synkopater_delete_preset = (
  componentId: string,
  preset: PerformanceComponentPreset
): Thunk => {
  return (dispatch, getState) => {
    const component = getPerformanceComponents(getState())[
      componentId
    ] as SynkopaterPerformanceComponent;
    const { sequencerId } = component;
    dispatch({
      type: SYNKOPATER_DELETE_PRESET,
      payload: {
        componentId,
        sequencerId,
        presetId: preset.id,
      },
    });
  };
};

export const synkopater_toggle_follow_octatrack = (
  componentId: string
): SynkopaterToggleFollowOctatrack => ({
  type: SYNKOPATER_TOGGLE_FOLLOW_OCTATRACK,
  payload: {
    componentId,
  },
});

export const sequencer_toggle_euclid_bounce = (
  sequencerId: string
): SequencerToggleEuclidBounce => ({
  type: SEQUENCER_TOGGLE_EUCLID_BOUNCE,
  payload: {
    sequencerId,
  },
});

export const sequencer_update_mod = (
  sequencerId: string,
  modParam: SequencerModSeqParamKey,
  newValue: MidiModSequence
): SequencerUpdateModSequence => ({
  type: SEQUENCER_UPDATE_MOD_SEQUENCE,
  payload: {
    sequencerId,
    modParam,
    newValue,
  },
});

export const sequencer_update_mod_length = (
  sequencerId: string,
  modParam: SequencerModSeqParamKey,
  newLength: number
): SequencerUpdateModSequenceLength => ({
  type: SEQUENCER_UPDATE_MOD_SEQUENCE_LENGTH,
  payload: {
    sequencerId,
    modParam,
    newLength,
  },
});

const state_rehydrated = (serializedState: string): StateRehydrated => ({
  type: STATE_REHYDRATED,
  payload: {
    serializedState,
  },
});

export const rehydrate_state = (): Thunk => {
  return (dispatch, getState) => {
    const serializedState = JSON.stringify(getSerializedState(getState()));

    dispatch(state_rehydrated(serializedState));
  };
};

export const sequencerChangesAppliedTimeout = (
  sequencerId: string
): SequencerChangesAppliedTimeout => ({
  type: SEQUENCER_CHANGES_APPLIED_TIMEOUT,
  payload: {
    sequencerId,
    timestamp: new Date().getTime() / 1000,
  },
});

export const sequencerRandomizeNotes = (
  sequencer: SynkopaterSequencer,
  scale: ReturnType<typeof getScale>,
  // null means randomize all notes
  numNotesToRandomize: number | null
): SequencerRandomizeNotes => ({
  type: SEQUENCER_RANDOMIZE_NOTES,
  payload: {
    sequencerId: sequencer.sequencerId,
    newNotes: randomizeSequencerNotes(sequencer.notes, scale, numNotesToRandomize),
  },
});

export const handleSequencerRandomizeNotes =
  (sequencerId: string, numNotesToRandomize = null) => (dispatch, getState) => {
    const sequencer = getSequencer(getState(), { sequencerId });
    const scale = getScale(getState());
    dispatch(
      sequencerRandomizeNotes(
        sequencer,
        scale,
        numNotesToRandomize
      )
    );
  };
