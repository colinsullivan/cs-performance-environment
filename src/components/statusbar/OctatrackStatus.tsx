import React from 'react';
import { useSelector } from "react-redux";

import { getOctatrack } from "common/selectors";

const OctatrackStatus = () => {
  const octatrack = useSelector(getOctatrack);

  const { currentPatternProgramChangeValue } = octatrack;

  return (
    <div></div>
  );
};

export default OctatrackStatus;
