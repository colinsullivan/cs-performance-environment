/**
 *  @file       Piano.jsx
 *
 *	@desc       A piano component for clicking or tapping, sends which note
 *	and the height (can be a proxy for velocity) of the click.  Modeled after
 *	a common Max/MSP object.
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

import { useCallback } from "react";
import { parse as parseNote } from "note-parser";
import WhitePianoKey from "./WhitePianoKey";
import BlackPianoKey from "./BlackPianoKey";

const diatonicNoteNames = [
  "c",
  "db",
  "d",
  "eb",
  "e",
  "f",
  "gb",
  "g",
  "ab",
  "a",
  "bb",
  "b",
];

const isWhiteNote = (note) => note.alt === 0;
const isBlackNote = (note) => note.alt !== 0;

const Piano = ({
  startingOctave = 3,
  numOctaves = 3,
  keyBaseWidth = 2.5,
  handleNoteClicked,
  selectedNotes = [],
  activeNotes = [],
  showSelectedNoteOrder = true,
  invalidNotes = [],
  notesForScaleInVisibleRange = [],
  showNotesInScale = false,
}) => {
  const handleKeyClicked = useCallback(
    (note, eventHeight) => {
      if (handleNoteClicked) {
        handleNoteClicked(note, eventHeight);
      }
    },
    [handleNoteClicked]
  );
  var notes = [];

  // TODO: This could probably be done once for all notes
  // TODO: Use tonaljs for this stuff instead and remove parseNote dependency
  let oi;
  for (oi = startingOctave; oi < startingOctave + numOctaves; oi++) {
    let ni;
    for (ni = 0; ni < diatonicNoteNames.length; ni++) {
      const noteName = `${diatonicNoteNames[ni]}${oi}`;
      const note = parseNote(noteName);
      notes.push(note);
    }
  }

  const blackKeyBaseWidthRatio = 0.5;
  const containerStyle = {
    height: "6em",
    border: "0",
    position: "relative",
    width: "100%",
    overflowX: "scroll",
    overflowY: "hidden",
    backgroundColor: "white"
  };
  const keyLayerStyle = {
    height: "100%",
    width: `${notes.filter(isWhiteNote).length * keyBaseWidth}em`,
    position: "absolute",
    pointerEvents: "none",
  };
  const blackKeyLayerStyle = Object.assign(
    {
      left: `${blackKeyBaseWidthRatio * keyBaseWidth}em`,
    },
    keyLayerStyle
  );

  const notesWithDisplayInfo = notes.map((n) => ({
    ...n,
    selected: selectedNotes.includes(n.midi),
    active: activeNotes.includes(n.midi),
    invalid: invalidNotes.includes(n.midi),
    outOfScale: !notesForScaleInVisibleRange.includes(n.midi),
    showNotesInScale
  }));

  return (
    <div style={containerStyle}>
      <div style={keyLayerStyle}>
        {notesWithDisplayInfo.filter(isWhiteNote).map((note, i) => (
          <WhitePianoKey
            selectedNotes={selectedNotes}
            note={note}
            key={i}
            handleKeyClicked={handleKeyClicked}
            keyBaseWidth={keyBaseWidth}
            showSelectedNoteOrder={showSelectedNoteOrder}
            {...note}
          />
        ))}
      </div>
      <div style={blackKeyLayerStyle}>
        {notesWithDisplayInfo.filter(isBlackNote).map((note, i) => (
          <BlackPianoKey
            selectedNotes={selectedNotes}
            note={note}
            key={i}
            index={i}
            handleKeyClicked={handleKeyClicked}
            keyBaseWidth={keyBaseWidth}
            blackKeyBaseWidthRatio={blackKeyBaseWidthRatio}
            showSelectedNoteOrder={showSelectedNoteOrder}
            {...note}
          />
        ))}
      </div>
    </div>
  );
};

export default Piano;
