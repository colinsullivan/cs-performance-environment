import React from "react";
import { useSelector } from "react-redux";

import { getOctatrack } from "common/selectors";
import OTPatternNumDisplay from "components/OTPatternNumDisplay";

import "./OctatrackStatus.scss";

const OctatrackStatus = () => {
  const octatrack = useSelector(getOctatrack);

  const { currentPatternProgramChangeValue } = octatrack;

  return (
    <div className="octatrack-status">
      <label>OT: </label>
      <OTPatternNumDisplay
        octatrackPatternValue={currentPatternProgramChangeValue}
        active={currentPatternProgramChangeValue !== null}
        size="small"
      />
    </div>
  );
};

export default OctatrackStatus;
