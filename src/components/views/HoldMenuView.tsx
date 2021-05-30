import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { getScaleHoldMenuIsOpen } from "common/selectors";
import ScaleView from "components/views/ScaleView";
import { offDarkColor, getRGBAString } from "constants/colors";

const HoldMenuViewContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: ${getRGBAString(offDarkColor)};
`;

const HoldMenuView = () => {
  const holdMenuIsOpen = useSelector(getScaleHoldMenuIsOpen);
  let overlayView: React.ReactNode = null;

  if (holdMenuIsOpen) {
    overlayView = <ScaleView />;
  }
  return holdMenuIsOpen ? <HoldMenuViewContainer>{overlayView}</HoldMenuViewContainer> : null;
};

export default HoldMenuView;
