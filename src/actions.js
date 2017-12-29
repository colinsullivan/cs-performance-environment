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
