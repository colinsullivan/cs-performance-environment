import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import Piano from "components/Piano/Piano";
import { sequencer_update_param } from "common/actions";
import { getScale } from "common/selectors";
import {
  getNotesForScaleOctaveRange,
  getMidiNoteNumbersFromNotes,
} from "common/models/scale";

class SynkopaterPiano extends React.Component {
  handleNoteClicked(note) {
    if (this.props.sequencer.notes.includes(note.midi)) {
      this.props.changeSequencerParam(
        "notes",
        _.without(this.props.sequencer.notes, note.midi)
      );
    } else {
      this.props.changeSequencerParam(
        "notes",
        _.concat(this.props.sequencer.notes, note.midi)
      );
    }
  }
  render() {
    const {
      sequencer: { notes, event },
      startingOctave = 3,
      numOctaves = 8,
      scale,
    } = this.props;

    const notesForScaleInVisibleRange = getNotesForScaleOctaveRange(
      scale,
      startingOctave,
      numOctaves
    );
    const midiNotesForScaleInRange = getMidiNoteNumbersFromNotes(
      notesForScaleInVisibleRange
    );

    const selectedNotesOutOfScale = notes.filter(
      (n) => !midiNotesForScaleInRange.includes(n)
    );

    return (
      <Piano
        handleNoteClicked={this.handleNoteClicked.bind(this)}
        startingOctave={startingOctave}
        numOctaves={numOctaves}
        selectedNotes={notes}
        activeNotes={event ? [event.midinote] : []}
        invalidNotes={selectedNotesOutOfScale}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    sequencer: state.sequencers[ownProps.sequencerId],
    scale: getScale(state),
  };
}
function mapDispatchToProps(dispatch, ownProps) {
  return {
    changeSequencerParam: (param, val) => {
      dispatch(sequencer_update_param(ownProps.sequencerId, param, val));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SynkopaterPiano);
