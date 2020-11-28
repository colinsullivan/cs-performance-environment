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
} from "./types";

import { SequencerParamKeys, synkopaterToPresetProps } from "common/models/synkopater";
import { create_preset } from "common/models/performance_component";
import { ARP_MODES, TRANSPOSE_DIRECTION, PerformanceComponentPreset } from "common/models/types";
import { READY_STATES } from "common/models/ready_states";
import { ControllerMappingElements } from "common/models/types";
import { getPerformanceComponents, getSequencer, getOctatrack } from "common/selectors";

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
  param: SequencerParamKeys,
  value: any
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
  value: any
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
  newValue: any
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

export const synkopater_save_preset = (
  componentId: string,
  followOctatrackPattern: boolean
): Thunk => {
  return (dispatch, getState) => {
    const component = getPerformanceComponents(getState())[componentId];
    const { sequencerId } = component;
    const sequencer = getSequencer(getState(), { sequencerId });
    const octatrack = getOctatrack(getState());
    const props = synkopaterToPresetProps(component, sequencer);
    const preset = create_preset(octatrack, props, followOctatrackPattern);
    dispatch({
      type: SYNKOPATER_SAVE_PRESET,
      payload: {
        componentId,
        preset
      },
    });
  };
};

export const synkopater_update_preset = (componentId: string): Thunk => {
  return (dispatch, getState) => {
    const component = getPerformanceComponents(getState())[componentId];
    const { sequencerId } = component;
    dispatch({
      type: SYNKOPATER_UPDATE_PRESET,
      payload: {
        componentId,
        sequencerId,
      },
    });
  };
};

export const synkopater_load_preset = (componentId: string, presetId: string) : Thunk => {
  return (dispatch, getState) => {
    const component = getPerformanceComponents(getState())[componentId];
    const { sequencerId } = component;
    console.log("componentId");
    console.log(componentId);
    console.log("component");
    console.log(component);
    const preset = component.presets.find((p : PerformanceComponentPreset) => p.id === presetId);
    dispatch({
      type: SYNKOPATER_LOAD_PRESET,
      payload: {
        componentId,
        sequencerId,
        preset
      }
    });
  };
}
