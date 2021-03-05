import React from 'react';

import ToggleOffIcon from "@material-ui/icons/ToggleOff";
import ToggleOnIcon from "@material-ui/icons/ToggleOn";

import TouchButton from "components/TouchButton";

const ToggleButtonWithLabel = ({ labelText, enabled, onClick }) => {
  return (
    <TouchButton
      onClick={onClick}
      icon={enabled ? <ToggleOnIcon /> : <ToggleOffIcon />}
      labelText={labelText}
    />
  );
};

export default ToggleButtonWithLabel;
