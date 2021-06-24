import React from "react";
import TouchSynkopater from "components/TouchSynkopater";
import { sequencerIds } from "common/models";

const SynkopaterView = () => (
  <div className="col">
    {sequencerIds.map((sequencerId) => (
      <TouchSynkopater key={sequencerId} sequencerId={sequencerId} />
    ))}
  </div>
);

export default SynkopaterView;
