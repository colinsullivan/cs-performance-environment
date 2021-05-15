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
  const portCount = inOrOut.getPortCount();

  console.log("portCount");
  console.log(portCount);

  let i = 0;
  for (i = 0; i < portCount; i++) {
    const portName = inOrOut.getPortName(i);
    console.log("portName");
    console.log(portName);
  }
}

export function getEnvOrError (envName: string): string {
  if (!(envName in process.env)) {
    throw new Error(`Expected environment variable ${envName} to be defined.`);
  }
  return process.env[envName] as string;
}
