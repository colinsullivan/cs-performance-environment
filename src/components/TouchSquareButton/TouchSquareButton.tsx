import { FunctionComponent, TouchEventHandler } from "react";
import CSS from "csstype";
import { turquoiseTransparentColor, getRGBAString } from "constants/colors";
import SquareButtonLabel from "./SquareButtonLabel";

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
  labelText?: string | null;
}

const TouchSquareButton: FunctionComponent<TouchSquareButtonProps> = ({
  onTouchStart,
  onTouchEnd,
  onTouchMove,
  children,
  styles = {},
  labelText = null
}) => (
  <div
    onTouchEnd={onTouchEnd}
    onTouchMove={onTouchMove}
    onTouchStart={onTouchStart}
    style={{
      ...touchSquareButtonStyle,
      ...styles,
    }}
  >
    {labelText ? <SquareButtonLabel text={labelText} /> : null}
    {children}
  </div>
);

export default TouchSquareButton;
