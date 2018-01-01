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

var input = new midi.input();
var output = new midi.output();

function list_ports (inOrOut) {
  var portCount = inOrOut.getPortCount();

  console.log("portCount");
  console.log(portCount);

  let i;
  for (i = 0; i < portCount; i++) {
    let portName = inOrOut.getPortName(i);
    console.log("portName");
    console.log(portName);
  }
}

console.log("Input ports:");
list_ports(input);

console.log("Output ports:");
list_ports(output);
