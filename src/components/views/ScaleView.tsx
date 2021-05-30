import ScalePiano from "components/ScalePiano";
import KeyTouchSelector from "components/views/ScaleView/KeyTouchSelector";

import OverlayView from "components/views/OverlayView";

const ScaleView = () => (
  <OverlayView>
    <div className="row">
      <div className="col">
        <div className="row">
          <div className="col">
            <ScalePiano />
          </div>
          <div className="col">
            <KeyTouchSelector />
          </div>
        </div>
      </div>
    </div>
  </OverlayView>
);

export default ScaleView;
