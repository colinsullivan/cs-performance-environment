import React from "react";
import { useDispatch } from "react-redux";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";

import { TRANSPOSE_DIRECTION } from "common/models/types";
import TouchButton from "components/TouchButton";
import { synkopater_transposed } from "common/actions";

const directionToArrowComponent = {
  [TRANSPOSE_DIRECTION.UP]: KeyboardArrowRight,
  [TRANSPOSE_DIRECTION.DOWN]: KeyboardArrowLeft,
};

interface TransposeButtonProps {
  sequencerId: string;
  transposeDirection: TRANSPOSE_DIRECTION;
}

const TransposeButton = (props: TransposeButtonProps) => {
  const dispatch = useDispatch();
  const { transposeDirection, sequencerId } = props;
  const ArrowIconComponent = directionToArrowComponent[transposeDirection];
  return (
    <TouchButton
      icon={<ArrowIconComponent />}
      onClick={() =>
        dispatch(synkopater_transposed(sequencerId, transposeDirection))
      }
    />
  );
};

export default TransposeButton;
