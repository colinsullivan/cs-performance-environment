import { createSelector } from "reselect";

import {
  scaleMenuId,
  HoldMenusState,
  HoldMenuState,
} from "common/models/menus";

export const getHoldMenus = (state): HoldMenusState => state.holdMenus;

export const getScaleHoldMenuIsOpen = createSelector(
  [getHoldMenus],
  (holdMenus) => holdMenus[scaleMenuId].isOpen
);

export const getOpenHoldMenu = createSelector(
  [getHoldMenus],
  (holdMenus): HoldMenuState | null => {
    for (const holdMenuId of Object.keys(holdMenus)) {
      const holdMenu = holdMenus[holdMenuId];
      if (holdMenu.isOpen) {
        return holdMenu;
      }
    }
    return null;
  }
);

