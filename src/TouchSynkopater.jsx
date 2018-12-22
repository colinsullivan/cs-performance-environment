import React from 'react';

import PlayButtonTouch from 'components/PlayButtonTouch';
import StopButtonTouch from 'components/StopButtonTouch';
import QueueSequencerButton from 'components/QueueSequencerButton';
import SequencerParamTouchSelector from 'components/SequencerParamTouchSelector';
import EuclideanTouchControl from 'components/EuclideanTouchControl/EuclideanTouchControl';
import TouchSynkopaterPiano from 'components/TouchSynkopaterPiano';

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
          <TouchSynkopaterPiano
            sequencerId={sequencerId}
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
            <div className="col-2">
              <SequencerParamTouchSelector
                sequencerId={sequencerId}
                param='dur'
                options={durOptions}
              />
            </div>
            <div className="col-3">
              <EuclideanTouchControl
                sequencerId={sequencerId}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default TouchSynkopater;
