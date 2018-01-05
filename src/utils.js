/**
 *  @file       utils.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

/**
 *  List available midi ports given a midi.input or midi.output instance.
 **/
export function list_midi_ports (inOrOut) {
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
