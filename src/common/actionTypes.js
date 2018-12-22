/**
 *  @file       actionTypes.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

export const SYNKOPATER_ARP_ADD_NOTE = "SYNKOPATER_ARP_ADD_NOTE";
export const SYNKOPATER_ARP_REMOVE_NOTE = "SYNKOPATER_ARP_REMOVE_NOTE";
export const SYNKOPATER_ARP_CHANGE_MODE = "SYNKOPATER_ARP_CHANGE_MODE";
export const SEQUENCER_STATE_UPDATED = "SEQUENCER_STATE_UPDATED";
export const MIDI_CONTROLLER_INIT = "MIDI_CONTROLLER_INIT";
export const MIDI_CONTROLLER_CC = "MIDI_CONTROLLER_CC";
// when instrument's parameter is updated from within (via SC's MIDI
// controller, perhaps)
export const INSTRUMENT_PARAMETER_UPDATED = "INSTRUMENT_PARAMETER_UPDATED";
export const WS_READYSTATE_UPDATE = 'WS_READYSTATE_UPDATE';
