export interface HoldMenuState {
  menuId: string;
  isOpen: boolean;
}

export interface HoldMenusState {
  [menuId: string]: HoldMenuState
}
