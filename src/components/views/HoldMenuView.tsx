import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { getOpenHoldMenu } from "common/selectors";
import ScaleView from "components/views/ScaleView";
import { offDarkColor, getRGBAString } from "constants/colors";
import { scaleMenuId, modulationMenuId } from "common/models/menus";
import ModulationView from "components/views/ModulationView";

const HoldMenuViewContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: ${getRGBAString(offDarkColor)};
`;

const HoldMenuView = () => {
  const openHoldMenu = useSelector(getOpenHoldMenu);
  let overlayView: React.ReactNode = null;

  if (openHoldMenu) {
    switch (openHoldMenu.menuId) {
      case scaleMenuId:
        overlayView = <ScaleView />;
        break;

      case modulationMenuId:
        overlayView = <ModulationView />;
        break;

      default:
        throw new Error(
          `Cannot render menu with menuId ${openHoldMenu.menuId}`
        );
    }
  }
  return openHoldMenu ? <HoldMenuViewContainer>{overlayView}</HoldMenuViewContainer> : null;
};

export default HoldMenuView;
