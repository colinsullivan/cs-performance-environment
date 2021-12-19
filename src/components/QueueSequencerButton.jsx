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
import PlayArrowOutlined from "@material-ui/icons/PlayArrowOutlined";

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
    switch (this.props.sequencer.playingState) {
      case PLAYING_STATES.STOPPED:
        return <TouchButton onClick={this.props.queue} icon={<PlayArrow />} />;

      case PLAYING_STATES.PLAYING:
        return <TouchButton onClick={this.props.stop} icon={<Pause />} />;

      case PLAYING_STATES.QUEUED:
        return <TouchButton icon={<PlayArrowOutlined />} />;

      default:
        return null;
    }
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
