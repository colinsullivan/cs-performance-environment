import MenuHoldButton from "components/MenuHoldButton";

import { modulationMenuId } from "common/models/menus";

const ModulationMenuHoldButton = () => (
  <MenuHoldButton menuId={modulationMenuId} labelText="mod" />
);

export default ModulationMenuHoldButton;
