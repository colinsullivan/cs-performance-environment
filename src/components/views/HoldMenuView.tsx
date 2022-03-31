import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { getOpenHoldMenu } from "common/selectors";
import ScaleView from "components/views/ScaleView";
import { offDarkColor, getRGBAString } from "constants/colors";
import {
  scaleMenuId,
  modulationMenuId,
  abletonMenuId,
} from "common/models/menus";
import ModulationView from "components/views/ModulationView";
import AbletonSessionView from "./AbletonSessionView";

const HoldMenuViewContainer = styled.div`
  position: absolute;
  z-index: 1000;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: ${getRGBAString(offDarkColor)};
`;

const getViewForHoldMenu = (menuId: string) => {
  switch (menuId) {
    case scaleMenuId:
      return <ScaleView />;

    case modulationMenuId:
      return <ModulationView />;

    case abletonMenuId:
      return <AbletonSessionView />;

    default:
      return null;
  }
};

const HoldMenuView = () => {
  const openHoldMenu = useSelector(getOpenHoldMenu);
  let overlayView: React.ReactNode = null;

  if (openHoldMenu) {
    overlayView = getViewForHoldMenu(openHoldMenu.menuId);
  }
  return openHoldMenu ? (
    <HoldMenuViewContainer>{overlayView}</HoldMenuViewContainer>
  ) : null;
};

export default HoldMenuView;
