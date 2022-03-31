export interface HoldMenuState {
  menuId: string;
  menuLabel: string;
  isOpen: boolean;
}

export interface HoldMenusState {
  [menuId: string]: HoldMenuState
}
