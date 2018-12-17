import React from 'react';

import SynkopaterPiano from './SynkopaterPiano';
import PlayButtonTouch from './PlayButtonTouch';
import StopButtonTouch from './StopButtonTouch';
import QueueSequencerButton from './QueueSequencerButton';
import SequencerParamTouchSelector from './SequencerParamTouchSelector';

class TouchSynkopater extends React.Component {
  render() {
    const { sequencerId } = this.props;

    const durOptions = [
      {value: 8, label: "8"},
      {value: 4, label: "4"},
      {value: 2, label: "2"},
      {value: 1, label: "1"},
      {value: 3/4, label: "3/4"},
      {value: 1/2, label: "1/2"},
      {value: 2/3, label: "2/3"},
      {value: 1/3, label: "1/3"},
      {value: 1/8, label: "1/8"},
      {value: 1/16, label: "1/16"},
      {value: 1/32, label: "1/32"}
    ];
    return (
      <div className="row">
        <div className="col-12">
          <SynkopaterPiano
            sequencerId={sequencerId}
            keyBaseWidth={3}
          />
        </div>
        <div className="col-12">
          <div className="row">
            <div className="col-1">
              <QueueSequencerButton
                playButtonComponent={PlayButtonTouch}
                stopButtonComponent={StopButtonTouch}
                sequencerId={sequencerId}
              />
            </div>
            <div className="col-1">
              <SequencerParamTouchSelector
                sequencerId={sequencerId}
                param='dur'
                options={durOptions}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default TouchSynkopater;
