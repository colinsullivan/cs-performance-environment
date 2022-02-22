import _ from "lodash";
import { Key } from "@tonaljs/tonal";


import { KeyTonic, KeyQuality } from "common/models/scale";
import { create_synkopater_sequencer } from "common/models/synkopater";
import { createDefaultScaleState } from "common/models/scale";
import { randomizeSequencerNotes } from "common/models/synkopater";

describe("randomizeSequencerNotes",  () => {
  const tonic: KeyTonic = "D";
  const quality: KeyQuality = "major";
  const tonalJSKey = Key.majorKey(tonic);
  const seq = create_synkopater_sequencer("id", "Something", 0, "Device", "Port");
  const scale = { ...createDefaultScaleState(), key: {
    tonic,
    quality
  }, scale: [...tonalJSKey.scale]  };

  test("keeps notes in octave", () => {
    const noteNumbers = [60, 72, 84];
    seq.notes = noteNumbers;

    const randomizedNotes = randomizeSequencerNotes(seq.notes, scale);
    expect(randomizedNotes).toHaveLength(3);
    expect(randomizedNotes).not.toEqual(noteNumbers);
  });

  test.each([
    [1],
    [2]
  ])("randomizes numNotesToRandomize", (numNotesToRandomize) => {
    const noteNumbers = [60, 72, 84];
    seq.notes = noteNumbers;

    for (let i = 0; i < 1000; i++) {
      const randomizedNotes = randomizeSequencerNotes(seq.notes, scale, numNotesToRandomize);
      expect(randomizedNotes).toHaveLength(noteNumbers.length);
      expect(randomizedNotes).not.toEqual(noteNumbers);

      let numDiffs = 0;
      randomizedNotes.forEach((_n, i) => {
        if (randomizedNotes[i] !== seq.notes[i]) {
          numDiffs += 1;
        }
      });
      expect(numDiffs).toEqual(numNotesToRandomize);
    }
  });


})
