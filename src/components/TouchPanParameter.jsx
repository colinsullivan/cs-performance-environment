import React from "react";
import {
  turquoiseTransparentColor,
  orangeTransparentColor,
  getRGBAString,
} from "constants/colors";
import { 
  DIRECTION_UP,
  DIRECTION_DOWN,
} from "constants/ui";
import TouchSquareButton from "components/TouchSquareButton";

const styles = {
  panningStyle: {
    backgroundColor: getRGBAString(orangeTransparentColor),
  },
  notPanningStyle: {
    backgroundColor: getRGBAString(turquoiseTransparentColor),
  },
};

const noop = () => {
  return;
};

class TouchPanParameter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      panning: false,
      panAmount: 0,
      prevY: null,
    };
  }
  handleTouchMove = (e) => {
    const {
      valueChangeThreshold = 5,
      tickUp = noop,
      tickDown = noop,
    } = this.props;

    const { prevY } = this.state;

    const y = e.nativeEvent.targetTouches[0].clientY;
    let panAmount = this.state.panAmount;

    // Determines direction if a previous Y value exists.
    if (prevY) {
      const direction = prevY < y ? DIRECTION_DOWN : DIRECTION_UP;

      switch (direction) {
        case DIRECTION_UP:
          panAmount -= 1;
          if (Math.abs(panAmount) > valueChangeThreshold) {
            panAmount = 0;
            tickUp();
          }
          break;

        case DIRECTION_DOWN:
          panAmount += 1;
          if (Math.abs(panAmount) > valueChangeThreshold) {
            panAmount = 0;
            tickDown();
          }
          break;

        default:
          break;
      }
    }
    this.setState({
      panAmount,
      prevY: y,
    });
  };
  handleTouchStart = () => {
    const { panStart = noop } = this.props;
    this.setState({
      panning: true,
      panAmount: 0,
    });
    panStart();
  };

  handleTouchEnd = () => {
    const { panEnd = noop } = this.props;
    this.setState({
      panning: false,
    });
    panEnd();
  };

  render() {
    return (
      <TouchSquareButton
        onTouchEnd={this.handleTouchEnd}
        onTouchMove={this.handleTouchMove}
        onTouchStart={this.handleTouchStart}
        styles={{
          ...(this.state.panning
            ? styles.panningStyle
            : styles.notPanningStyle),
        }}
      >
        {this.props.children}
      </TouchSquareButton>
    );
  }
}

export default TouchPanParameter;
