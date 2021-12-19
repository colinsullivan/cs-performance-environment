/**
 *  @file       QueueSequencerButton.jsx
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

import React from "react";
import { connect } from "react-redux";
import Pause from "@material-ui/icons/Pause";
import PlayArrow from "@material-ui/icons/PlayArrow";

import SCReduxSequencers from "supercollider-redux-sequencers";

import TouchButton from "components/TouchButton";
const PLAYING_STATES = SCReduxSequencers.PLAYING_STATES;

/**
 *  @class        QueueSequencerButton
 *
 *  @classdesc    Button to queue the sequencer to play or pause.
 **/
class QueueSequencerButton extends React.Component {
  render() {
    let buttonComponent;
    if (this.props.sequencer.playingState === PLAYING_STATES.STOPPED) {
      buttonComponent = (
        <TouchButton onClick={this.props.queue} icon={<PlayArrow />} />
      );
    } else {
      buttonComponent = (
        <TouchButton onClick={this.props.stop} icon={<Pause />} />
      );
    }
    return buttonComponent;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    sequencer: state.sequencers[ownProps.sequencerId],
  };
}
function mapDispatchToProps(dispatch, ownProps) {
  return {
    queue: () => {
      dispatch(SCReduxSequencers.actions.sequencerQueued(ownProps.sequencerId));
    },
    stop: () => {
      dispatch(
        SCReduxSequencers.actions.sequencerStopQueued(ownProps.sequencerId)
      );
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QueueSequencerButton);
