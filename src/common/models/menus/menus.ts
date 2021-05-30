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

const scaleMenu = createHoldMenu(scaleMenuId);

const createInitialHoldMenus = (): HoldMenusState =>
  keyBy([scaleMenu], "menuId");

export default createInitialHoldMenus;
