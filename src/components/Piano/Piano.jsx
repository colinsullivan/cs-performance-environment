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

import React, { useCallback } from 'react';
import styled from 'styled-components';
import { parse as parseNote } from 'note-parser';

const diatonicNoteNames = [
  'c',
  'db',
  'd',
  'eb',
  'e',
  'f',
  'gb',
  'g',
  'ab',
  'a',
  'bb',
  'b'
];


var keyClickHandler = function (e, note, handler) {
  var keyHeight = e.target.clientHeight;
  var clickHeight = e.nativeEvent.offsetY;

  var clickHeightPercent = 1.0 - (clickHeight / keyHeight);

  handler(note, clickHeightPercent);
};

const defaultSelectedColor = 'green';
const defaultActiveColor = 'pink';
const defaultNoteNumberColor = 'white';

const NoteNumberContainer = styled.div`
  position: absolute;
  color: ${defaultNoteNumberColor};
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

const NoteNumber = ({ selectedNotes, note }) => {
  const number = selectedNotes.indexOf(note.midi) + 1;
  return (
    <NoteNumberContainer>{number}</NoteNumberContainer>
  );
};

class WhitePianoKey extends React.Component {
  render() {
    const {
      selectedNotes,
      note,
      handleKeyClicked,
      selected,
      active,
      keyBaseWidth,
      selectedColor = defaultSelectedColor,
      activeColor = defaultActiveColor,
      showSelectedNoteOrder
    } = this.props;

    const containerStyle = {
      borderRight: '1px solid black',
      borderBottom: 'none',
      position: 'relative',
      display: 'inline-block',
      backgroundColor: 'white',
      width: `${keyBaseWidth}em`,
      height: '100%',
      pointerEvents: 'all'
    };

    if (selected || active) {
      if (selected) {
        containerStyle.backgroundColor = selectedColor || 'green';
      }

      if (active) {
        containerStyle.backgroundColor = activeColor || 'pink';
      }
    }

    return (
      <div
        style={containerStyle}
        onClick={(e) => keyClickHandler(e, note, handleKeyClicked)}
      >
        {selected && showSelectedNoteOrder ? <NoteNumber selectedNotes={selectedNotes} note={note} /> : null}
      </div>
    );
  }
};

class BlackPianoKey extends React.Component {
  render() {
    const {
      selectedNotes,
      note,
      index,
      handleKeyClicked,
      selected,
      active,
      blackKeyBaseWidthRatio,
      keyBaseWidth,
      selectedColor=defaultSelectedColor,
      activeColor=defaultActiveColor,
      showSelectedNoteOrder
    } = this.props;
    var containerStyle = {
      backgroundColor: 'black',
      width: `${blackKeyBaseWidthRatio * keyBaseWidth}em`,
      height: '50%',
      //float: 'left',
      display: 'inline-block',
      pointerEvents: 'all',
      position: 'relative'
    };

    if (selected || active) {
      containerStyle.border = '1px solid black';

      if (selected) {
        containerStyle.backgroundColor = selectedColor || 'green';
      }

      if (active) {
        containerStyle.backgroundColor = activeColor || 'pink';
      }
    }


    if (index > 0) {
      if ([1, 6].includes(note.chroma)) {
        containerStyle.marginLeft = `${blackKeyBaseWidthRatio * keyBaseWidth + keyBaseWidth}em`;
      } else {
        containerStyle.marginLeft = `${blackKeyBaseWidthRatio * keyBaseWidth}em`;
      }
    } else {
      containerStyle.marginLeft = `${0.5*blackKeyBaseWidthRatio * keyBaseWidth}em`;
    }


    return (
      <div
        style={containerStyle}
        onClick={(e) => keyClickHandler(e, note, handleKeyClicked)}
      >
        {selected && showSelectedNoteOrder ? <NoteNumber selectedNotes={selectedNotes} note={note} /> : null}
      </div>
    );
  }
};

const isWhiteNote = (note) => note.alt === 0;
const isBlackNote = (note) => note.alt !== 0;

const Piano = ({ startingOctave = 3, numOctaves = 3, keyBaseWidth = 1.5, handleNoteClicked, selectedNotes, activeNotes, showSelectedNoteOrder = true }) => {
  const handleKeyClicked = useCallback((note, eventHeight) => {
    if (handleNoteClicked) {
      handleNoteClicked(note, eventHeight);
    }
  });
    var notes = [];


    // TODO: This could probably be done once for all notes
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
      height: '6em',
      border: '0',
      position: 'relative',
      width: '100%',
      overflowX: 'scroll',
      overflowY: 'hidden'
    };
    const keyLayerStyle = {
      height: '100%',
      width: `${notes.filter(isWhiteNote).length * keyBaseWidth}em`,
      position: 'absolute',
      pointerEvents: 'none'
    };
    const blackKeyLayerStyle = Object.assign({
      left: `${blackKeyBaseWidthRatio * keyBaseWidth}em`
    }, keyLayerStyle);

    return (
      <div style={containerStyle}>
        <div style={keyLayerStyle}>
          {notes.filter(isWhiteNote).map((note, i) => {
            const noteIsSelected = selectedNotes.includes(note.midi);
            const noteIsActive = activeNotes.includes(note.midi);
            return <WhitePianoKey
              selectedNotes={selectedNotes}
              note={note}
              key={i}
              handleKeyClicked={handleKeyClicked}
              selected={noteIsSelected}
              active={noteIsActive}
              keyBaseWidth={keyBaseWidth}
              showSelectedNoteOrder={showSelectedNoteOrder}
            />;
          })}
        </div>
        <div style={blackKeyLayerStyle}>
          {notes.filter(isBlackNote).map((note, i) => {
            const noteIsSelected = selectedNotes.includes(note.midi);
            const noteIsActive = activeNotes.includes(note.midi);
            return <BlackPianoKey
              selectedNotes={selectedNotes}
              note={note}
              key={i}
              index={i}
              handleKeyClicked={handleKeyClicked}
              selected={noteIsSelected}
              active={noteIsActive}
              keyBaseWidth={keyBaseWidth}
              blackKeyBaseWidthRatio={blackKeyBaseWidthRatio}
              showSelectedNoteOrder={showSelectedNoteOrder}
            />;
          })}
        </div>
      </div>
    );
};

export default Piano;
