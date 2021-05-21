import { setMenuIsOpen, HoldMenusState } from "common/models/menus";
import { OPEN_HOLD_MENU, CLOSE_HOLD_MENU } from "common/actions/menus";

import { AllActionTypes } from "common/actions/types";

// Enable this during development to keep menu held open
const STICKY_HOLD_MENUS = false;

const holdMenus = (state: HoldMenusState = {}, action: AllActionTypes) => {
  switch (action.type) {
    case OPEN_HOLD_MENU:
      return setMenuIsOpen(action.payload.menuId, state, true);
    case CLOSE_HOLD_MENU:
      return STICKY_HOLD_MENUS ? setMenuIsOpen(action.payload.menuId, state, true) : setMenuIsOpen(action.payload.menuId, state, false);
    default:
      return state;
  }
};

export default holdMenus;
