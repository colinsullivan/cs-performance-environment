/**
 *  @file       MidiControllerDispatcher.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

import midi from 'easymidi';
import { midi_controller_init, midi_controller_cc } from './actions';

/**
 *  @class        MidiControllerDispatcher
 *
 *  @classdesc    Instantiate for a midi controller, to dispatch midi messages
 *  and save midi controller state in Redux state store.
 **/
class MidiControllerDispatcher {
  constructor(store, controllerId) {
    this.store = store;
    this.controllerId = controllerId;
    this.inputPortName = this.getInputPortName();
    this.mappings = this.initMappings();

    this.store.dispatch(
      midi_controller_init(this.controllerId, this.mappings)
    );

    this.midiInput = new midi.Input(this.inputPortName);
    this.midiInput.on('cc', msg => this.handleCC(msg));
  }
  initMappings () {
    /**
     *  Define the mappings of cc messages to human readable keys to use in
     *  state store.
     *
     *  @return   Object  such as: {0: {13: 'knu1'}} where:
     *    0: midi channel 0
     *    13: cc 13
     *    knu1: some human readable name, in this case 1st knob on upper row
     **/
  }
  handleCC (msg) {
    this.store.dispatch(
      midi_controller_cc(
        this.controllerId,
        this.mappings[msg.channel][msg.controller],
        msg.value / 127.0
      )
    );
  }
}

export default MidiControllerDispatcher;
