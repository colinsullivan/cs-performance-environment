/**
 *  @file       Synkopater.jsx
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

import React from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import PlayArrow from 'material-ui-icons/PlayArrow';
import Pause from 'material-ui-icons/Pause';
import Select from 'material-ui/Select';

import awakeningSequencers from 'awakening-sequencers';
import * as actions from './actions';
import { ARP_MODES } from './reducers';
import Piano from './Piano';

const PLAYING_STATES = awakeningSequencers.PLAYING_STATES;

class Synkopater extends React.Component {
  handleNoteClicked (note, height) {
    if (this.props.sequencer.arp_notes.includes(note.midi)) {
      this.props.removeNote(note.midi);
    } else {
      this.props.addNote(note.midi);
    }
  }
  handleModeChange (e) {
    this.props.changeMode(e.target.value);
  }
  render () {

    var playPauseIcon;
    var playPauseOnClick;
    var selectedNotes = this.props.sequencer.arp_notes;
    var activeNotes = [];

    if (this.props.sequencer.event) {
      activeNotes.push(this.props.sequencer.event.midinote);
    }

    if (this.props.sequencer.playingState === PLAYING_STATES.STOPPED) {
      playPauseIcon = <PlayArrow />;
      playPauseOnClick = this.props.queue;
    } else {
      playPauseIcon = <Pause />;
      playPauseOnClick = this.props.stop;
    }

    return (
      <div className="row">
        <div className="col-xs-12">
          <Piano
            handleNoteClicked={this.handleNoteClicked.bind(this)}
            startingOctave={5}
            numOctaves={5}
            selectedNotes={selectedNotes}
            activeNotes={activeNotes}
          />
        </div>
        <div className="col-xs-12">
          <div className="row">
            <div className="col-xs-2">
              <Button fab mini onClick={playPauseOnClick}>
                {playPauseIcon}
              </Button>
            </div>
            <div className="col-xs-2">
							<Select
								native
								value={this.props.sequencer.arp_mode}
								onChange={this.handleModeChange.bind(this)}
							>
                {Object.keys(ARP_MODES).map((arpMode) => {
                  return <option value={arpMode}>{arpMode}</option>;
                })};
							</Select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps (state, ownProps) {
  return {
    sequencer: state.sequencers[ownProps.sequencerId]    
  };
}
function mapDispatchToProps (dispatch, ownProps) {
  return {
    queue: () => {
      dispatch(
        awakeningSequencers.actions.sequencerQueued(ownProps.sequencerId)
      )
    },
    stop: () => {
      dispatch(
        awakeningSequencers.actions.sequencerStopQueued(ownProps.sequencerId)
      )
    },
    removeNote: (note) => {
      dispatch(
        actions.synkopater_arp_remove_note(
          ownProps.sequencerId,
          note
        )
      )
    },
    addNote: (note) => {
      dispatch(
        actions.synkopater_arp_add_note(
          ownProps.sequencerId,
          note
        )
      );
    },
    changeMode: (mode) => {
      dispatch(
        actions.synkopater_arp_change_mode(
          ownProps.sequencerId,
          mode
        )
      );
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Synkopater);
