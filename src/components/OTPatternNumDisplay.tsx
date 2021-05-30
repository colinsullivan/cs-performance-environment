import React from "react";

import { OctatrackPatternValue } from "common/models/api";
import "./OTPatternNumDisplay.scss";

export type OTPatternNumDisplaySize = "small" | "large";
interface OTPatternNumDisplayProps {
  octatrackPatternValue: OctatrackPatternValue;
  active: boolean;
  size: OTPatternNumDisplaySize;
}

const formatOctatrackPatternValue = ({ octatrackPatternValue }) =>
  octatrackPatternValue + 1;

const OTPatternNumDisplay: React.FunctionComponent<OTPatternNumDisplayProps> =
  ({ octatrackPatternValue, active, size = "large" }) => (
    <div className={`ot-pattern-num size-${size} ${active ? "active" : ""}`}>
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
