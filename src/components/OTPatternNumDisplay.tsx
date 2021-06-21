import React from "react";

import { OctatrackPatternValue } from "common/models";
import "./OTPatternNumDisplay.scss";

export type OTPatternNumDisplaySize = "small" | "large";
interface OTPatternNumDisplayProps {
  octatrackPatternValue: OctatrackPatternValue;
  active: boolean;
  size: OTPatternNumDisplaySize;
}

const formatOctatrackPatternValue = (
  octatrackPatternValue: OctatrackPatternValue
) => (octatrackPatternValue ? octatrackPatternValue + 1 : null);

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
