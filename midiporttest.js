/**
 *  @file       midiporttest.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

import easymidi from 'easymidi';
import midi from 'midi';

import {list_midi_ports} from './src/utils';

var input = new midi.input();
var output = new midi.output();

console.log("Input ports:");
list_midi_ports(input);

console.log("Output ports:");
list_midi_ports(output);

input.closePort();
output.closePort();
