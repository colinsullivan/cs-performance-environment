import React, { FunctionComponent, TouchEventHandler } from "react";
import CSS from "csstype";
import {
  turquoiseTransparentColor,
  getRGBAString,
} from "constants/colors";

const size = 48;
const touchSquareButtonStyle = {
  width: size,
  height: size,
  backgroundColor: getRGBAString(turquoiseTransparentColor),
};

interface TouchSquareButtonProps {
  onTouchStart: TouchEventHandler<HTMLDivElement>;
  onTouchEnd?: TouchEventHandler<HTMLDivElement>;
  onTouchMove?: TouchEventHandler<HTMLDivElement>;
  styles?: CSS.Properties;
}

const TouchSquareButton: FunctionComponent<TouchSquareButtonProps> = ({
  onTouchStart,
  onTouchEnd,
  onTouchMove,
  children,
  styles = {},
}) => {
  return (
    <div
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
      onTouchStart={onTouchStart}
      style={{
        ...touchSquareButtonStyle,
        ...styles,
      }}
    >
      {children}
    </div>
  );
};

export default TouchSquareButton;
