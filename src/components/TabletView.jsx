import { useEffect } from "react";
import iNoBounce from "inobounce";

import ScaleMenuHoldButton from "components/ScaleMenuHoldButton";
import SynkopaterView from "components/views/SynkopaterView";
import HoldMenuView from "components/views/HoldMenuView";

const TabletView = () => {
  useEffect(() => iNoBounce.enable(), []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2">
          <ScaleMenuHoldButton />
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
