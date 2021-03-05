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
    <div>
      <EuclidBounceToggle sequencerId={sequencerId} />
    </div>
  );
};

export default EuclidBounceControls;
