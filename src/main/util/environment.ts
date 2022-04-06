import dotenv from "dotenv";

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

export function loadEnv () {
  const envPath = process.argv[2];
  if (envPath) {
    console.log(`Loading environment from ${envPath}`);
    dotenv.config({ path: envPath });
  } else {
    console.log("Loading environment from default location");
    dotenv.config();
  }

}
