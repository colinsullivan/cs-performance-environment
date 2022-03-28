import { keyBy } from "lodash";

import { HoldMenusState, HoldMenuState } from "./types";

const createHoldMenu = (menuId: string, menuLabel: string): HoldMenuState => ({
  menuId,
  menuLabel,
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
export const abletonMenuId = "abletonMenu";
export const mixMenuId = "mixMenu";

const createInitialHoldMenus = (): HoldMenusState => {
  const allHoldMenus = [
    createHoldMenu(scaleMenuId, "key"),
    createHoldMenu(modulationMenuId, "mod"),
    createHoldMenu(abletonMenuId, "live"),
    createHoldMenu(mixMenuId, "mix"),
  ];
  const initialState = keyBy(allHoldMenus, "menuId");

  initialState[mixMenuId].isOpen = true;

  return initialState;
};

export default createInitialHoldMenus;
