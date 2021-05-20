import { useCallback } from "react";
import { useDispatch } from "react-redux";

import TouchSquareButton from "components/TouchSquareButton/TouchSquareButton";
import { scaleMenuId } from "common/models/menus";
import { openHoldMenu, closeHoldMenu } from "common/actions";

const ScaleMenuHoldButton = () => {
  const dispatch = useDispatch();
  const openMenu = useCallback(
    () => dispatch(openHoldMenu(scaleMenuId)),
    [dispatch]
  );
  const closeMenu = useCallback(
    () => dispatch(closeHoldMenu(scaleMenuId)),
    [dispatch]
  );

  return (
    <div>
      <TouchSquareButton onTouchStart={openMenu} onTouchEnd={closeMenu} labelText="key" />
    </div>
  );
};

export default ScaleMenuHoldButton;
