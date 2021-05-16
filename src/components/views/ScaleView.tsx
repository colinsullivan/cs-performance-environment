import ScalePiano from "components/ScalePiano";
import KeyTouchSelector from "components/views/ScaleView/KeyTouchSelector";

const ScaleView = () => (
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
);

export default ScaleView;
