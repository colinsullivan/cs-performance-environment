import React from "react";
import { useSelector } from "react-redux";
import EuclidBounceToggle from "components/EuclidBounceToggle";
import SequencerParamTouchSelector from "components/SequencerParamTouchSelector";
import { sequencersSelector } from "common/selectors";
import { durOptions } from "constants/options";

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
  const sequencer = useSelector(
    (state) => sequencersSelector(state)[sequencerId]
  );
  const { euclidBounceEnabled } = sequencer;
  return (
    <div className="row">
      <div className="col-6">
        <EuclidBounceToggle sequencerId={sequencerId} />
      </div>
      <div className="col-2">
        <SequencerParamTouchSelector
          sequencerId={sequencerId}
          param="euclidBounceFirstDur"
          labelText="dur"
          options={durOptions}
          isDisabled={!euclidBounceEnabled}
        />
      </div>
      <div className="col-2">
        <SequencerParamTouchSelector
          sequencerId={sequencerId}
          param="euclidBounceFirstBeats"
          labelText="beats"
          options={bounceDurOptions}
          isDisabled={!euclidBounceEnabled}
        />
      </div>
      <div className="col-2">
        <SequencerParamTouchSelector
          sequencerId={sequencerId}
          param="euclidBounceFirstBeatsMult"
          labelText="mult"
          options={bounceDurMultiplierOptions}
          isDisabled={!euclidBounceEnabled}
        />
      </div>
      <div className="col-2">
        <SequencerParamTouchSelector
          sequencerId={sequencerId}
          param="euclidBounceSecondDur"
          labelText="dur"
          options={durOptions}
          isDisabled={!euclidBounceEnabled}
        />
      </div>
      <div className="col-2">
        <SequencerParamTouchSelector
          sequencerId={sequencerId}
          param="euclidBounceSecondBeats"
          labelText="beats"
          options={bounceDurOptions}
          isDisabled={!euclidBounceEnabled}
        />
      </div>
      <div className="col-2">
        <SequencerParamTouchSelector
          sequencerId={sequencerId}
          param="euclidBounceSecondBeatsMult"
          labelText="mult"
          options={bounceDurMultiplierOptions}
          isDisabled={!euclidBounceEnabled}
        />
      </div>
    </div>
  );
};

export default EuclidBounceControls;
