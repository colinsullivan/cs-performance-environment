/**
 *  @file       actions.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

import * as actionTypes from './actionTypes';

export function synkopater_arp_add_note (sequencerId, note) {
  return {
    type: actionTypes.SYNKOPATER_ARP_ADD_NOTE,
    payload: {
      sequencerId,
      note
    }
  };
}

export function synkopater_arp_remove_note (sequencerId, note) {
  return {
    type: actionTypes.SYNKOPATER_ARP_REMOVE_NOTE,
    payload: {
      sequencerId,
      note
    }
  };
}

export function synkopater_arp_change_mode (sequencerId, arp_mode) {
  return {
    type: actionTypes.SYNKOPATER_ARP_CHANGE_MODE,
    payload: {
      sequencerId,
      arp_mode
    }
  };
}

export function sequencer_update_param (sequencerId, param, value) {
  return {
    type: actionTypes.SEQUENCER_STATE_UPDATED,
    payload: {
      sequencerId,
      param,
      value
    }
  };
}

export function midi_controller_cc (controllerId, name, value) {
  return {
    type: actionTypes.MIDI_CONTROLLER_CC,
    payload: {
      controllerId,
      name,
      value
    }
  };
}

export function midi_controller_init (controllerId, mappings) {
  return {
    type: actionTypes.MIDI_CONTROLLER_INIT,
    payload: {
      controllerId,
      mappings
    }
  };
}

export function instrument_parameter_updated (componentId, parameterId, newValue) {
  return {
    type: actionTypes.INSTRUMENT_PARAMETER_UPDATED,
    payload: {
      componentId,
      parameterId,
      newValue
    }
  };
}

export function websocketReadyStateChanged (readyState) {
  return {
    type: actionTypes.WS_READYSTATE_UPDATE,
    payload: { readyState }
  };
}
