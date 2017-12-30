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

import React from 'react';
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

var keyBaseWidth = 1.5;
var blackKeyBaseWidthRatio = 0.5;

var keyClickHandler = function (e) {
  var keyHeight = e.target.clientHeight;
  var clickHeight = e.nativeEvent.offsetY;

  var clickHeightPercent = 1.0 - (clickHeight / keyHeight);

  this.props.handleKeyClicked(this, clickHeightPercent);
};

class WhitePianoKey extends React.Component {
  render () {
    var containerStyle = {
      borderRight: '1px solid black',
      borderBottom: 'none',
      position: 'relative',
      display: 'inline-block',
      backgroundColor: 'white',
      width: `${keyBaseWidth}em`,
      height: '100%',
      pointerEvents: 'all'
    };

    if (this.props.selected || this.props.active) {
      if (this.props.selected) {
        containerStyle.backgroundColor = this.props.selectedColor || 'green';
      }

      if (this.props.active) {
        containerStyle.backgroundColor = this.props.activeColor || 'pink';
      }
    }


    return (
      <div style={containerStyle} onClick={keyClickHandler.bind(this)}>
      </div>
    )
  }
}

class BlackPianoKey extends React.Component {
  render () {

    var containerStyle = {
      backgroundColor: 'black',
      width: `${blackKeyBaseWidthRatio * keyBaseWidth}em`,
      height: '50%',
      //float: 'left',
      display: 'inline-block',
      pointerEvents: 'all'
      //position: 'relative'
    };

    if (this.props.selected || this.props.active) {
      containerStyle.border = '1px solid black';
      
      if (this.props.selected) {
        containerStyle.backgroundColor = this.props.selectedColor || 'green';
      }

      if (this.props.active) {
        containerStyle.backgroundColor = this.props.activeColor || 'pink';
      }
    }
    

    if (this.props.index > 0) {
      if ([1, 6].includes(this.props.note.chroma)) {
        containerStyle.marginLeft = `${blackKeyBaseWidthRatio * keyBaseWidth + keyBaseWidth}em`;
      } else {
        containerStyle.marginLeft = `${blackKeyBaseWidthRatio * keyBaseWidth}em`;
      }
    } else {
      containerStyle.marginLeft = `${0.5*blackKeyBaseWidthRatio * keyBaseWidth}em`;
    }


    return (
      <div style={containerStyle} onClick={keyClickHandler.bind(this)}>
      </div>
    );
  }
}

class Piano extends React.Component {
  handleKeyClicked(keyComponent, eventHeight) {
    if (this.props.handleNoteClicked) {
      this.props.handleNoteClicked(keyComponent.props.note, eventHeight);
    }
  }
  render () {
    var notes = [];

    var startingOctave = this.props.startingOctave || 3;
    var numOctaves = this.props.numOctaves || 3;

    // TODO: This could probably be done once for all notes
    let oi;
    for (oi = startingOctave; oi < startingOctave + numOctaves; oi++) {
      let ni;
      for (ni = 0; ni < diatonicNoteNames.length; ni++) {
        let noteName = `${diatonicNoteNames[ni]}${oi}`;
        let note = parseNote(noteName);
        notes.push(note);
      }
    }

    var containerStyle = {
      height: '6em',
      border: '1px solid black',
      position: 'relative'
    };
    var keyLayerStyle = {
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none'
    };
    var blackKeyLayerStyle = Object.assign({
      left: `${0.5 * keyBaseWidth}em`
    }, keyLayerStyle);
    return (
      <div style={containerStyle}>
        <div style={keyLayerStyle}>
          {notes.filter((note) => {
            return note.alt === 0;
          }).map((note, i) => {
            let noteIsSelected = this.props.selectedNotes.includes(note.midi);
            let noteIsActive = this.props.activeNotes.includes(note.midi);
            return <WhitePianoKey
              note={note}
              key={i}
              handleKeyClicked={this.handleKeyClicked.bind(this)}
              selected={noteIsSelected}
              active={noteIsActive}
            />;
          })}
        </div>
        <div style={blackKeyLayerStyle}>
          {notes.filter((note) => {
            return note.alt !== 0;
          }).map((note, i) => {
            let noteIsSelected = this.props.selectedNotes.includes(note.midi);
            let noteIsActive = this.props.activeNotes.includes(note.midi);
            return <BlackPianoKey
              note={note}
              key={i}
              index={i}
              handleKeyClicked={this.handleKeyClicked.bind(this)}
              selected={noteIsSelected}
              active={noteIsActive}
            />;
          })}
        </div>
      </div>
    );
  }
}

export default Piano;
