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

const scaleMenu = createHoldMenu("scaleMenu");

const createInitialHoldMenus = (): HoldMenusState =>
  keyBy([scaleMenu], "menuId");

export default createInitialHoldMenus;
