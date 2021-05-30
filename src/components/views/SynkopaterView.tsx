import React from "react";
import TouchSynkopater from "components/TouchSynkopater";

const SynkopaterView = () => (
  <div className="col">
    <TouchSynkopater componentId="synkopaterA" sequencerId="synkopaterA" />
    <TouchSynkopater componentId="synkopaterB" sequencerId="synkopaterB" />
  </div>
);

export default SynkopaterView;
