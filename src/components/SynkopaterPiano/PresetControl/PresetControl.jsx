import React from "react";

import OctatrackFollowControl from "./OctatrackFollowControl";
import PresetIndicatorRows from "./PresetIndicatorRows";
import SavePresetButton from "./SavePresetButton.jsx";

const PresetControl = ({ componentId }) => {
  return (
      <div className="row">
          <OctatrackFollowControl componentId={componentId} />
          <SavePresetButton componentId={componentId} />
        <PresetIndicatorRows componentId={componentId} />
      </div>
  );
};

export default PresetControl;
