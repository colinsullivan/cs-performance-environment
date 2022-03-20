import React from "react";

import { useSelector } from "react-redux";
import { getTempo } from "common/selectors";
import { tempoToBpm, roundTwoDecimals } from "common/util";

const TempoDisplay = () => {
  const tempo = useSelector(getTempo);
  const bpm = roundTwoDecimals(tempoToBpm(tempo));
  return <div>{bpm} bpm</div>;
};

export default TempoDisplay;
