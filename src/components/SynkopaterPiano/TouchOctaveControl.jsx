import React from "react";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";

import TouchButton from "components/TouchButton";
import { numOctaves } from "./constants";

const TouchOctaveControl = ({
  sequencerId,
  startingOctave,
  setStartingOctave,
}) => {
  return (
    <div className="col">
      <TouchButton
        icon={<KeyboardArrowLeft />}
        onClick={() => setStartingOctave(Math.max(0, startingOctave - 1))}
      />
      <span>
        C{startingOctave} - C{startingOctave + numOctaves}
      </span>
      <TouchButton
        icon={<KeyboardArrowRight />}
        onClick={() => setStartingOctave(startingOctave + 1)}
      />
    </div>
  );
};

export default TouchOctaveControl;
