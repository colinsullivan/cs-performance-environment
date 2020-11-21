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
  SynkopaterTransposed
} from "./types";

import { ARP_MODES, TRANSPOSE_DIRECTION, SequencerParamKeys } from "common/models/synkopater";
import { READY_STATES } from "common/models/ready_states";

export function synkopater_arp_add_note(sequencerId: string, note: number) : SynkopaterAddNote {
  return {
    type: SYNKOPATER_ARP_ADD_NOTE,
    payload: {
      sequencerId,
      note,
    },
  };
}

export function synkopater_arp_remove_note(sequencerId: string, note: number) : SynkopaterRemoveNote {
  return {
    type: SYNKOPATER_ARP_REMOVE_NOTE,
    payload: {
      sequencerId,
      note,
    },
  };
}

export function synkopater_arp_change_mode (
  sequencerId: string,
  arpMode: ARP_MODES
) : SynkopaterChangeMode {
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
) : SequencerUpdateParam {
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
) : MidiControllerCC {
  return {
    type: MIDI_CONTROLLER_CC,
    payload: {
      controllerId,
      name,
      value,
    },
  };
}

export function midi_controller_init(controllerId: string, mappings: object) : MidiControllerInit {
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
) : InstrumentParameterUpdated {
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
) : WebsocketReadyStateChanged {
  return {
    type: WS_READYSTATE_UPDATE,
    payload: { readyState, clientId },
  };
}

export function synkopater_transposed(
  sequencerId: string,
  direction: TRANSPOSE_DIRECTION
) : SynkopaterTransposed {
  return {
    type: SYNKOPATER_TRANSPOSED,
    payload: {
      sequencerId,
      direction,
    },
  };
}
