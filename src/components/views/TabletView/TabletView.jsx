import { useEffect } from "react";
import { useSelector } from "react-redux";
import iNoBounce from "inobounce";

import ScaleMenuHoldButton from "./ScaleMenuHoldButton";
import ModulationMenuHoldButton from "./ModulationMenuHoldButton";
import { getOpenHoldMenu } from "common/selectors";
import SynkopaterView from "components/views/SynkopaterView";
import ScaleView from "components/views/ScaleView";
import ModulationView from "components/views/ModulationView";
import { scaleMenuId, modulationMenuId } from "common/models/menus";

const TabletView = () => {
  const openHoldMenu = useSelector(getOpenHoldMenu);
  const holdMenuIsOpen = openHoldMenu !== null;
  useEffect(() => iNoBounce.enable(), []);

  let view;

  if (holdMenuIsOpen) {
    switch (openHoldMenu.menuId) {
      case scaleMenuId:
        view = <ScaleView />;
        break;

      case modulationMenuId:
        view = <ModulationView />;
        break;

      default:
        throw new Error(
          `Cannot render menu with menuId ${openHoldMenu.menuId}`
        );
    }
  } else {
    view = <SynkopaterView />;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2">
          <div>
            <ScaleMenuHoldButton />
            <ModulationMenuHoldButton />
          </div>
        </div>
        {view}
      </div>
    </div>
  );
};

export default TabletView;
