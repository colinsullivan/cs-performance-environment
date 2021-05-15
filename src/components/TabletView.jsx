import { useEffect } from "react";
import { useSelector } from "react-redux";
import iNoBounce from "inobounce";

import ScaleMenuHoldButton from "components/ScaleMenuHoldButton";
import { getScaleHoldMenuIsOpen } from "common/selectors";
import SynkopaterView from "components/views/SynkopaterView";
import ScaleView from "components/views/ScaleView";

const TabletView = () => {
  const holdMenuIsOpen = useSelector(getScaleHoldMenuIsOpen);
  useEffect(() => iNoBounce.enable(), []);

  let view;

  if (holdMenuIsOpen) {
    view = <ScaleView />;
  } else {
    view = <SynkopaterView />;
  }

  return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <ScaleMenuHoldButton />
          </div>
          {view}
        </div>
      </div>
  );
};

export default TabletView;
