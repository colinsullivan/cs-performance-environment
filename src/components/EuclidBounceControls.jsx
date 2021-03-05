import React from "react";
import EuclidBounceToggle from "components/EuclidBounceToggle";
import SequencerParamTouchSelector from "components/SequencerParamTouchSelector";

const bounceDurOptions = [
  { value: 7, label: "7" },
  { value: 6, label: "6" },
  { value: 5, label: "5" },
  { value: 4, label: "4" },
  { value: 3, label: "3" },
  { value: 2, label: "2" },
  { value: 1.5, label: "1 1/2" },
  { value: 1, label: "1" },
  { value: 3 / 4, label: "3/4" },
  { value: 1 / 2, label: "1/2" },
];

const bounceDurMultiplierOptions = [
  { value: 5, label: "5" },
  { value: 4, label: "4" },
  { value: 3, label: "3" },
  { value: 2, label: "2" },
  { value: 1, label: "1" },
];

const EuclidBounceControls = ({ sequencerId }) => {
  return (
    <div className="row">
      <div className="col-2">
        <EuclidBounceToggle sequencerId={sequencerId} />
      </div>
      <div className="col-2">
        <SequencerParamTouchSelector
          sequencerId={sequencerId}
          param="euclidBounceFirstDur"
          labelText="first"
          options={bounceDurOptions}
        />
      </div>
      <div className="col-2">
        <SequencerParamTouchSelector
          sequencerId={sequencerId}
          param="euclidBounceFirstDurMult"
          labelText="mult"
          options={bounceDurMultiplierOptions}
        />
      </div>
      <div className="col-2">
        <SequencerParamTouchSelector
          sequencerId={sequencerId}
          param="euclidBounceSecondDur"
          labelText="second"
          options={bounceDurOptions}
        />
      </div>
      <div className="col-2">
        <SequencerParamTouchSelector
          sequencerId={sequencerId}
          param="euclidBounceSecondDurMult"
          labelText="mult"
          options={bounceDurMultiplierOptions}
        />
      </div>
    </div>
  );
};

export default EuclidBounceControls;
