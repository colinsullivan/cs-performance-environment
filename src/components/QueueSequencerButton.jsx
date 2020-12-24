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

import SCReduxSequencers from "supercollider-redux-sequencers";
const PLAYING_STATES = SCReduxSequencers.PLAYING_STATES;

/**
 *  @class        QueueSequencerButton
 *
 *  @classdesc    Button to queue the sequencer to play or pause.
 **/
class QueueSequencerButton extends React.Component {
  render() {
    let ButtonComponent, onClick;
    const { playButtonComponent, stopButtonComponent } = this.props;
    if (this.props.sequencer.playingState === PLAYING_STATES.STOPPED) {
      ButtonComponent = playButtonComponent;
      onClick = this.props.queue;
    } else {
      ButtonComponent = stopButtonComponent;
      onClick = this.props.stop;
    }
    return <ButtonComponent onClick={onClick} />;
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
