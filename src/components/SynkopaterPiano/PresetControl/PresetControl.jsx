import React from "react";

import PresetIndicatorRows from "./PresetIndicatorRows";
import SavePresetButton from "./SavePresetButton.jsx";

const PresetControl = ({ componentId }) => {
  return (
    <div className="row">
      <SavePresetButton componentId={componentId} />
      <PresetIndicatorRows componentId={componentId} />
    </div>
  );
};

export default PresetControl;
