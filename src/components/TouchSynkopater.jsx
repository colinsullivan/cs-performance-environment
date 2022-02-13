import React from "react";

import QueueSequencerButton from "components/QueueSequencerButton";
import SequencerParamTouchSelector from "components/SequencerParamTouchSelector";
import EuclideanTouchControl from "components/EuclideanTouchControl/EuclideanTouchControl";
import TouchSynkopaterPiano from "components/SynkopaterPiano/TouchSynkopaterPiano";
import InstrParamTouchSelector from "components/InstrParamTouchSelector";
import SynkDelayTimeDisplay from "components/SynkDelayTimeDisplay";
import QuantDropdown from "components/QuantDropdown";
import OctatrackFollowControl from "components/SynkopaterPiano/PresetControl/OctatrackFollowControl";
import EuclidBounceControls from "components/EuclidBounceControls";
import SequencerDurControl from "components/TouchSynkopater/SequencerDurControl";

import { durOptions } from "constants/options";

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
  { value: 4 + 1 / 4, label: "4 1/4" },
  { value: 4 + 1 / 6, label: "4 1/6" },
  { value: 4 + 1 / 8, label: "4 1/8" },
  { value: 4 + 1 / 16, label: "4 1/16" },
  { value: 4 + 1 / 32, label: "4 1/32" },
  { value: 4, label: "4" },
  { value: 3 + 3 / 4, label: "3 3/4" },
  { value: 3 + 1 / 2, label: "3 1/2" },
  { value: 3 + 2 / 3, label: "3 2/3" },
  { value: 3 + 1 / 3, label: "3 1/3" },
  { value: 3 + 1 / 4, label: "3 1/4" },
  { value: 3 + 1 / 6, label: "3 1/6" },
  { value: 3 + 1 / 8, label: "3 1/8" },
  { value: 3 + 1 / 16, label: "3 1/16" },
  { value: 3 + 1 / 32, label: "3 1/32" },
  { value: 3, label: "3" },
  { value: 2 + 3 / 4, label: "2 3/4" },
  { value: 2 + 1 / 2, label: "2 1/2" },
  { value: 2 + 2 / 3, label: "2 2/3" },
  { value: 2 + 1 / 3, label: "2 1/3" },
  { value: 2 + 1 / 4, label: "2 1/4" },
  { value: 2 + 1 / 6, label: "2 1/6" },
  { value: 2 + 1 / 8, label: "2 1/8" },
  { value: 2 + 1 / 16, label: "2 1/16" },
  { value: 2 + 1 / 32, label: "2 1/32" },
  { value: 2, label: "2" },
  { value: 1 + 3 / 4, label: "1 3/4" },
  { value: 1 + 1 / 2, label: "1 1/2" },
  { value: 1 + 2 / 3, label: "1 2/3" },
  { value: 1 + 1 / 3, label: "1 1/3" },
  { value: 1 + 1 / 4, label: "1 1/4" },
  { value: 1 + 1 / 6, label: "1 1/6" },
  { value: 1 + 1 / 8, label: "1 1/8" },
  { value: 1 + 1 / 16, label: "1 1/16" },
  { value: 1 + 1 / 32, label: "1 1/32" },
  { value: 1, label: "1" },
  { value: 3 / 4, label: "3/4" },
  { value: 1 / 2, label: "1/2" },
  { value: 2 / 3, label: "2/3" },
  { value: 1 / 3, label: "1/3" },
  { value: 1 / 4, label: "1/4" },
  { value: 1 / 6, label: "1/6" },
  { value: 1 / 8, label: "1/8" },
  { value: 1 / 16, label: "1/16" },
  { value: 1 / 32, label: "1/32" },
];

class TouchSynkopater extends React.Component {
  render() {
    const { sequencerId } = this.props;
    const componentId = sequencerId;
    return (
      <div>
        <div className="row">
          <div className="col-2">
            <div className="row">
              <QueueSequencerButton
                sequencerId={sequencerId}
              />
            </div>
            <div className="row">
              <OctatrackFollowControl componentId={componentId} />
            </div>
            <div className="row">
              <QuantDropdown sequencerId={sequencerId} />
            </div>
          </div>

          <div className="col-22">
            <TouchSynkopaterPiano
              sequencerId={sequencerId}
              componentId={componentId}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            <SequencerDurControl sequencerId={sequencerId} />
          </div>
          <div className="col-2">
            <SequencerParamTouchSelector
              sequencerId={sequencerId}
              param="legato"
              options={legatoOptions}
            />
          </div>
          <div className="col-2">
            <SequencerParamTouchSelector
              sequencerId={sequencerId}
              param="offset"
              options={offsetOptions}
            />
          </div>
          <div className="col-6">
            <EuclideanTouchControl sequencerId={sequencerId} />
          </div>
          <div className="col-6">
            <EuclideanTouchControl sequencerId={sequencerId} isSecond={true} />
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
        <EuclidBounceControls sequencerId={sequencerId} />
      </div>
    );
  }
}

export default TouchSynkopater;
