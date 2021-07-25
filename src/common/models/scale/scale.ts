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

//export const getMidiNoteNumbersFromNotesWithError = (
  //notes: Array<NoteType>
//): Array<number> => notes.map((n) => {
  //if (n.midi !== null && typeof(n.midi) !== undefined) {
  //return n.midi as number;
  //}
//});
export const getMidiNoteNumberFromNote = (
  n: NoteType | NoNote
): number | null => n.midi ? n.midi : null;
export const getMidiNoteNumbersFromNotes = (
  notes: Array<NoteType | NoNote>
): Array<number | null> => notes.map(getMidiNoteNumberFromNote);

export const getNotesFromMidiNoteNumbers = (
  noteNumbers: Array<number>
): Array<NoteType | NoNote> =>
  noteNumbers.map((noteNumber) => Note.get(Note.fromMidi(noteNumber)));
