import { useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import TouchSquareButton from "components/TouchSquareButton/TouchSquareButton";
import { openHoldMenu, closeHoldMenu } from "common/actions";

interface MenuHoldButtonProps {
  menuId: string;
  labelText?: string;
}

const MenuHoldButtonContainer = styled.div`
  margin-left: 10px;
  margin-bottom: 10px;
`;

const MenuHoldButton = ({
  menuId,
  labelText,
}: MenuHoldButtonProps) => {
  const dispatch = useDispatch();
  const openMenu = useCallback(
    () => dispatch(openHoldMenu(menuId)),
    [dispatch, menuId]
  );
  const closeMenu = useCallback(
    () => dispatch(closeHoldMenu(menuId)),
    [dispatch, menuId]
  );

  return (
    <MenuHoldButtonContainer>
      <TouchSquareButton
        onTouchStart={openMenu}
        onTouchEnd={closeMenu}
        labelText={labelText}
      />
    </MenuHoldButtonContainer>
  );
};

export default MenuHoldButton;
