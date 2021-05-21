import React from "react";
import TouchSynkopater from "components/TouchSynkopater";
import { sequencerIds } from "common/models";

const SynkopaterView = () => (
  <div className="col">
    {sequencerIds.map((sequencerId) => (
      <TouchSynkopater sequencerId={sequencerId} />
    ))}
  </div>
);

export default SynkopaterView;
