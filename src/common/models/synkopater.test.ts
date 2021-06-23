import { Key } from "@tonaljs/tonal";


import { KeyTonic, KeyQuality } from "common/models/scale";
import { create_synkopater_sequencer } from "common/models/synkopater";
import { createDefaultScaleState } from "common/models/scale";
import { randomizeSequencerNotes } from "common/models/synkopater";

describe("randomizeSequencerNotes",  () => {
  test("keeps notes in octave", () => {
    const noteNumbers = [60, 72, 84];
    const tonic: KeyTonic = "D";
    const quality: KeyQuality = "major";
    const tonalJSKey = Key.majorKey(tonic);
    const seq = create_synkopater_sequencer("id", "Something", 0, "Device", "Port");
    seq.notes = noteNumbers;
    const scale = { ...createDefaultScaleState(), key: {
      tonic,
      quality
    }, scale: [...tonalJSKey.scale]  };
    const randomizedNotes = randomizeSequencerNotes(seq.notes, scale);
    expect(randomizedNotes).toHaveLength(3);
    expect(randomizedNotes).not.toEqual(noteNumbers);
  })
})
