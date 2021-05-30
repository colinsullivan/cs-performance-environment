import React from "react";

import { OctatrackPatternValue } from "common/models/api";
import "./OTPatternNumDisplay.scss";

interface OTPatternNumDisplayProps {
  octatrackPatternValue: OctatrackPatternValue;
  active: boolean;
}

const formatOctatrackPatternValue = ({ octatrackPatternValue }) =>
  octatrackPatternValue + 1;

const OTPatternNumDisplay: React.FunctionComponent<OTPatternNumDisplayProps> =
  ({ octatrackPatternValue, active }) => (
    <div className={`ot-pattern-num ${active ? "active" : ""}`}>
      <div>
        <div>
          {octatrackPatternValue !== null
            ? formatOctatrackPatternValue(octatrackPatternValue)
            : "N"}
        </div>
      </div>
    </div>
  );

export default OTPatternNumDisplay;
