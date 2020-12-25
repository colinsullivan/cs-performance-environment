import React from "react";

import OctatrackFollowControl from "./OctatrackFollowControl";
import PresetIndicatorRows from "./PresetIndicatorRows";
import SavePresetButton from "./SavePresetButton.jsx";

const PresetControl = ({ componentId }) => {
  return (
    <div className="col">
      <div className="row">
        <PresetIndicatorRows componentId={componentId} />
        <div className="col-2">
          <SavePresetButton />
        </div>
        <div className="col-2">
          <OctatrackFollowControl componentId={componentId} />
        </div>
      </div>
    </div>
  );
};

export default PresetControl;
