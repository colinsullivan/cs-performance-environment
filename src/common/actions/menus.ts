export const OPEN_HOLD_MENU = "OPEN_HOLD_MENU";
export const CLOSE_HOLD_MENU = "CLOSE_HOLD_MENU";

interface MenuActionPayload {
  menuId: string;
}

interface OpenHoldMenuAction {
  type: typeof OPEN_HOLD_MENU;
  payload: MenuActionPayload;
}

interface CloseHoldMenuAction {
  type: typeof CLOSE_HOLD_MENU;
  payload: MenuActionPayload;
}

export const openHoldMenu = (menuId: string): OpenHoldMenuAction => ({
  type: OPEN_HOLD_MENU,
  payload: {
    menuId,
  },
});

export const closeHoldMenu = (menuId: string): CloseHoldMenuAction => ({
  type: CLOSE_HOLD_MENU,
  payload: {
    menuId,
  },
});
