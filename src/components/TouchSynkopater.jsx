import React from "react";
import styled from "styled-components";

import PlayButtonTouch from "components/PlayButtonTouch";
import StopButtonTouch from "components/StopButtonTouch";
import QueueSequencerButton from "components/QueueSequencerButton";
import SequencerParamTouchSelector from "components/SequencerParamTouchSelector";
import EuclideanTouchControl from "components/EuclideanTouchControl/EuclideanTouchControl";
import TouchSynkopaterPiano from "components/SynkopaterPiano/TouchSynkopaterPiano";
import InstrParamTouchSelector from "components/InstrParamTouchSelector";
import SynkDelayTimeDisplay from "components/SynkDelayTimeDisplay";
import QuantDropdown from "components/QuantDropdown";

const durOptions = [
  { value: 8, label: "8" },
  { value: 4, label: "4" },
  { value: 2, label: "2" },
  { value: 1.5, label: "1 1/2" },
  { value: 1, label: "1" },
  { value: 3 / 4, label: "3/4" },
  { value: 1 / 2, label: "1/2" },
  { value: 2 / 3, label: "2/3" },
  { value: 1 / 3, label: "1/3" },
  { value: 1 / 8, label: "1/8" },
  { value: 1 / 16, label: "1/16" },
  { value: 1 / 32, label: "1/32" },
];

const offsetOptions = [
  ...durOptions,
  {
    value: 0,
    label: "0",
  },
];

const legatoOptions = [
  { value: 1, label: "1" },
  { value: 3 / 4, label: "3/4" },
  { value: 1 / 2, label: "1/2" },
  { value: 2 / 3, label: "2/3" },
  { value: 1 / 3, label: "1/3" },
  { value: 1 / 8, label: "1/8" },
  { value: 1 / 16, label: "1/16" },
  { value: 1 / 32, label: "1/32" },
  { value: 1 / 64, label: "1/64" },
  { value: 1 / 128, label: "1/128" },
];

const factorOptions = [
  { value: 4 + 3 / 4, label: "4 3/4" },
  { value: 4 + 1 / 2, label: "4 1/2" },
  { value: 4 + 2 / 3, label: "4 2/3" },
  { value: 4 + 1 / 3, label: "4 1/3" },
  { value: 4 + 1 / 8, label: "4 1/8" },
  { value: 4 + 1 / 16, label: "4 1/16" },
  { value: 4 + 1 / 32, label: "4 1/32" },
  { value: 4, label: "4" },
  { value: 3 + 3 / 4, label: "3 3/4" },
  { value: 3 + 1 / 2, label: "3 1/2" },
  { value: 3 + 2 / 3, label: "3 2/3" },
  { value: 3 + 1 / 3, label: "3 1/3" },
  { value: 3 + 1 / 8, label: "3 1/8" },
  { value: 3 + 1 / 16, label: "3 1/16" },
  { value: 3 + 1 / 32, label: "3 1/32" },
  { value: 3, label: "3" },
  { value: 2 + 3 / 4, label: "2 3/4" },
  { value: 2 + 1 / 2, label: "2 1/2" },
  { value: 2 + 2 / 3, label: "2 2/3" },
  { value: 2 + 1 / 3, label: "2 1/3" },
  { value: 2 + 1 / 8, label: "2 1/8" },
  { value: 2 + 1 / 16, label: "2 1/16" },
  { value: 2 + 1 / 32, label: "2 1/32" },
  { value: 2, label: "2" },
  { value: 1 + 3 / 4, label: "1 3/4" },
  { value: 1 + 1 / 2, label: "1 1/2" },
  { value: 1 + 2 / 3, label: "1 2/3" },
  { value: 1 + 1 / 3, label: "1 1/3" },
  { value: 1 + 1 / 8, label: "1 1/8" },
  { value: 1 + 1 / 16, label: "1 1/16" },
  { value: 1 + 1 / 32, label: "1 1/32" },
  { value: 1, label: "1" },
  { value: 3 / 4, label: "3/4" },
  { value: 1 / 2, label: "1/2" },
  { value: 2 / 3, label: "2/3" },
  { value: 1 / 3, label: "1/3" },
  { value: 1 / 8, label: "1/8" },
  { value: 1 / 16, label: "1/16" },
  { value: 1 / 32, label: "1/32" },
];


const TouchSynkopaterContainer = styled.div`
  padding-top: 12px;
  padding-left: 12px;
`;


class TouchSynkopater extends React.Component {
  render() {
    const { sequencerId, componentId } = this.props;
    return (
      <TouchSynkopaterContainer>
      <div className="row">
        <div className="col-1">
          <div className="row">
            <QueueSequencerButton
              playButtonComponent={PlayButtonTouch}
              stopButtonComponent={StopButtonTouch}
              sequencerId={sequencerId}
            />
          </div>
          <div className="row">
            <QuantDropdown sequencerId={sequencerId} />
          </div>
        </div>
        <div className="col-11">
          <TouchSynkopaterPiano sequencerId={sequencerId} componentId={componentId} />
        </div>
        <div className="col-12">
          <div className="row">
            <div className="col-2">
              <SequencerParamTouchSelector
                sequencerId={sequencerId}
                param="dur"
                options={durOptions}
              />
              <SequencerParamTouchSelector
                sequencerId={sequencerId}
                param="offset"
                options={offsetOptions}
              />
              <SequencerParamTouchSelector
                sequencerId={sequencerId}
                param="legato"
                options={legatoOptions}
              />
            </div>
            <div className="col-3">
              <EuclideanTouchControl sequencerId={sequencerId} />
            </div>
            <div className="col-2">
              <InstrParamTouchSelector
                componentId={componentId}
                param="delayFactor"
                options={factorOptions}
              />
              <SynkDelayTimeDisplay sequencerId={sequencerId} />
            </div>
          </div>
        </div>
      </div>
      </TouchSynkopaterContainer>
    );
  }
}

export default TouchSynkopater;
