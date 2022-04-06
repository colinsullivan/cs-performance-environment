import { FunctionComponent, TouchEventHandler } from "react";
import CSS from "csstype";
import { turquoiseTransparentColor, getRGBAString } from "constants/colors";
import SquareButtonLabel from "./SquareButtonLabel";
import { createUseStyles } from "react-jss";

const touchSquareButtonStyle = {};

interface TouchSquareButtonProps {
  onTouchStart: TouchEventHandler<HTMLDivElement>;
  onTouchEnd?: TouchEventHandler<HTMLDivElement>;
  onTouchMove?: TouchEventHandler<HTMLDivElement>;
  styles?: CSS.Properties;
  labelText?: string | null;
  size?: number;
}

const defaultSize = 48;

const useStyles = createUseStyles<"button", TouchSquareButtonProps>({
  button: {
    width: (props) => props.size || defaultSize,
    height: (props) => props.size || defaultSize,
    backgroundColor: getRGBAString(turquoiseTransparentColor),
  },
});

const TouchSquareButton: FunctionComponent<TouchSquareButtonProps> = (
  props
) => {
  const {
    onTouchStart,
    onTouchEnd,
    onTouchMove,
    children,
    styles = {},
    labelText = null,
  } = props;
  const style = useStyles(props);
  return (
    <div
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
      onTouchStart={onTouchStart}
      className={style.button}
      style={{
        ...touchSquareButtonStyle,
        ...styles,
      }}
    >
      {labelText ? <SquareButtonLabel text={labelText} /> : null}
      {children}
    </div>
  );
};

export default TouchSquareButton;
