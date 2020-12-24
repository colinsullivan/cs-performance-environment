import React from "react";
import { connect } from "react-redux";
import * as _ from "lodash";

import Piano from "components/Piano/Piano";
import { sequencer_update_param } from "common/actions";

class SynkopaterPiano extends React.Component {
  handleNoteClicked(note, height) {
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
      keyBaseWidth,
      sequencer: { notes, event },
      startingOctave = 3,
      numOctaves = 8,
    } = this.props;
    return (
      <Piano
        handleNoteClicked={this.handleNoteClicked.bind(this)}
        startingOctave={startingOctave}
        numOctaves={numOctaves}
        selectedNotes={notes}
        activeNotes={event ? [event.midinote] : []}
        keyBaseWidth={keyBaseWidth}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    sequencer: state.sequencers[ownProps.sequencerId],
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
