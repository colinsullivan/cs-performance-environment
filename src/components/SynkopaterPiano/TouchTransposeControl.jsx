import React from "react";

import TransposeButton from "./TransposeButton";
import { TRANSPOSE_DIRECTION } from "common/models/types";

const TouchTransposeControl = ({ sequencerId }) => {
  return (
    <div>
      <TransposeButton
        sequencerId={sequencerId}
        transposeDirection={TRANSPOSE_DIRECTION.DOWN}
      />
      <span>transpose</span>
      <TransposeButton
        sequencerId={sequencerId}
        transposeDirection={TRANSPOSE_DIRECTION.UP}
      />
    </div>
  );
};

export default TouchTransposeControl;
