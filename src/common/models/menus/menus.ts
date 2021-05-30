import { keyBy } from "lodash";

import { HoldMenusState, HoldMenuState } from "./types";

const createHoldMenu = (menuId: string): HoldMenuState => ({
  menuId,
  isOpen: false,
});

export const setMenuIsOpen = (
  menuId: string,
  holdMenus: HoldMenusState,
  newIsOpen: boolean
) => ({
  ...holdMenus,
  [menuId]: {
    ...holdMenus[menuId],
    isOpen: newIsOpen,
  },
});

export const scaleMenuId = "scaleMenu";
export const modulationMenuId = "modulationMenu";

const createInitialHoldMenus = (): HoldMenusState =>
  keyBy([scaleMenuId, modulationMenuId].map(createHoldMenu), "menuId");

export default createInitialHoldMenus;
