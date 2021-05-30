import { setMenuIsOpen, HoldMenusState } from "common/models/menus";
import { OPEN_HOLD_MENU, CLOSE_HOLD_MENU } from "common/actions/menus";

import { AllActionTypes } from "common/actions/types";

const holdMenus = (state: HoldMenusState = {}, action: AllActionTypes) => {
  switch (action.type) {
    case OPEN_HOLD_MENU:
      return setMenuIsOpen(action.payload.menuId, state, true);
    case CLOSE_HOLD_MENU:
      return setMenuIsOpen(action.payload.menuId, state, false);
    default:
      return state;
  }
};

export default holdMenus;
