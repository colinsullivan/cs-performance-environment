import React from 'react';

import SynkopaterPiano from './SynkopaterPiano';
import PlayButtonTouch from './PlayButtonTouch';
import StopButtonTouch from './StopButtonTouch';
import QueueSequencerButton from './QueueSequencerButton';

class TouchSynkopater extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-12">
          <SynkopaterPiano
            sequencerId={this.props.sequencerId}
            keyBaseWidth={3}
          />
        </div>
        <div className="col-12">
          <div className="row">
            <div className="col-1">
              <QueueSequencerButton
                playButtonComponent={PlayButtonTouch}
                stopButtonComponent={StopButtonTouch}
                sequencerId={this.props.sequencerId}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default TouchSynkopater;
