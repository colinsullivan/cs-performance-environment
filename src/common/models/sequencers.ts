import { create_synkopater_sequencer } from "common/models";
import { getEnvOrError } from "common/util";

export const createInitialSequencersState = () => {
  const midiOutDeviceName = getEnvOrError(
    "REACT_APP_SYNKOPATER_MIDI_OUT_DEVICE_NAME"
  );
  const midiOutPortName = getEnvOrError(
    "REACT_APP_SYNKOPATER_MIDI_OUT_DEVICE_PORT"
  );

  return {
    synkopaterA: create_synkopater_sequencer(
      "synkopaterA",
      "SynkopaterOutboardSequencer",
      1, // 2 (SuperCollider is zero-indexed)
      midiOutDeviceName,
      midiOutPortName
    ),
    synkopaterB: create_synkopater_sequencer(
      "synkopaterB",
      "SynkopaterOutboardSequencer",
      2, // 3 (SuperCollider is zero-indexed)
      midiOutDeviceName,
      midiOutPortName
    ),
  };
};
