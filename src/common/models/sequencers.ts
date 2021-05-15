import { create_synkopater_sequencer } from "common/models";
const midiOutDeviceName = "(in) SuperCollider";
const midiOutPortName = "(in) SuperCollider";
//const midiOutDeviceName = "UltraLite AVB";
//const midiOutPortName = "MIDI Out";
export const createInitialSequencersState = () => ({
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
});
