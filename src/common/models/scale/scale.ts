import { Note } from "@tonaljs/tonal";
import { Note as NoteType, NoNote } from "@tonaljs/core";

import { ScaleState } from "./types";

export const createDefaultScaleState = (): ScaleState => ({
  key: null,
  scale: [],
});

export const getNotesForScaleOctave = (
  scale: ScaleState,
  octave: number
): Array<NoteType | NoNote> =>
  scale.scale.map((s) => Note.get(`${s}${octave}`));

export const getNotesForScaleOctaveRange = (
  scale: ScaleState,
  startingOctave: number,
  numOctaves: number
) => {
  let notes: Array<NoteType | NoNote> = [];
  let o: number;
  for (o = startingOctave; o < startingOctave + numOctaves; o++) {
    notes = notes.concat(getNotesForScaleOctave(scale, o));
  }
  return notes;
};

export const getMidiNoteNumbersFromNotes = (
  notes: Array<NoteType | NoNote>
): Array<number | null> => notes.map((n) => (n.midi ? n.midi : null));

export const getNotesFromMidiNoteNumbers = (
  noteNumbers: Array<number>
): Array<NoteType | NoNote> =>
  noteNumbers.map((noteNumber) => Note.get(Note.fromMidi(noteNumber)));
