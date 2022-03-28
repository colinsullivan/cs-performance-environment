import { useEffect } from "react";
import iNoBounce from "inobounce";
import { useSelector } from "react-redux";

import SynkopaterView from "components/views/SynkopaterView";
import HoldMenuView from "components/views/HoldMenuView";
import { getHoldMenus } from "common/selectors";
import MenuHoldButton from "components/MenuHoldButton";

const TabletView = () => {
  useEffect(() => iNoBounce.enable(), []);
  const holdMenus = useSelector(getHoldMenus);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2">
          <div>
            {Object.keys(holdMenus).map((holdMenuId) => {
              const holdMenu = holdMenus[holdMenuId];
              return (
                <MenuHoldButton
                  key={holdMenuId}
                  menuId={holdMenu.menuId}
                  labelText={holdMenu.menuLabel}
                />
              );
            })}
          </div>
        </div>
        <div className="col">
          <SynkopaterView />
          <HoldMenuView />
        </div>
      </div>
    </div>
  );
};

export default TabletView;
