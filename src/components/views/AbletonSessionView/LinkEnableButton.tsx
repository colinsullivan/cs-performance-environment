import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { getLinkEnabled } from "common/selectors";
import ToggleButtonWithLabel from "components/ToggleButtonWithLabel";
import {abletonLinkDisable, abletonLinkEnable} from "common/actions";

const LinkEnableButton = () => {
  const dispatch = useDispatch();
  const linkEnabled = useSelector(getLinkEnabled);

  const handleClick = () => {
    if (linkEnabled) {
      dispatch(abletonLinkDisable());
    } else {
      dispatch(abletonLinkEnable());
    }
  };

  return (
    <ToggleButtonWithLabel
      labelText={"Link enabled"}
      enabled={linkEnabled}
      onClick={handleClick}
    />
  );
};

export default LinkEnableButton;
