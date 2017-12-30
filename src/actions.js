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

export function synkopater_change_param (sequencerId, param, value) {
  return {
    type: actionTypes.SYNKOPATER_CHANGE_PARAM,
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
