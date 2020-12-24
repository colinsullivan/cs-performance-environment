import React from "react";
import Hammer from "react-hammerjs";
import { DIRECTION_UP, DIRECTION_DOWN } from "hammerjs";
import {
  turquoiseTransparentColor,
  orangeTransparentColor,
  getRGBAString,
} from "constants/colors";

const styles = {
  containerStyle: {
    minWidth: "48px",
    minHeight: "48px",
  },
  panningStyle: {
    backgroundColor: getRGBAString(orangeTransparentColor),
  },
  notPanningStyle: {
    backgroundColor: getRGBAString(turquoiseTransparentColor),
  },
};

const hammerOptions = {
  touchAction: "compute",
  recognizers: {
    pan: {
      threshold: 1,
    },
  },
};

class TouchPanParameter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      panning: false,
      panAmount: 0,
    };
  }
  handlePan = (e) => {
    const {
      panCallbackAmount = 5,
      valueChangeThreshold = 5 * 15,
      tickUp = null,
      tickDown = null,
    } = this.props;

    let panAmount = this.state.panAmount;
    switch (e.direction) {
      case DIRECTION_UP:
        panAmount -= panCallbackAmount;

        if (panAmount < -1.0 * valueChangeThreshold) {
          this.setState({
            panAmount: 0,
          });
          if (tickUp) {
            tickUp();
          }
        } else {
          this.setState({
            panAmount,
          });
        }
        break;

      case DIRECTION_DOWN:
        panAmount += panCallbackAmount;
        if (panAmount > valueChangeThreshold) {
          this.setState({
            panAmount: 0,
          });
          if (tickDown) {
            tickDown();
          }
        } else {
          this.setState({
            panAmount,
          });
        }
        break;

      default:
        break;
    }
  };
  handlePanStart = (e) => {
    const { panStart = null } = this.props;
    this.setState({
      panning: true,
      panAmount: 0,
    });
    if (panStart) {
      panStart();
    }
  };

  handlePanEnd = (e) => {
    const { panEnd = null } = this.props;
    this.setState({
      panning: false,
    });
    if (panEnd) {
      panEnd();
    }
  };

  render() {
    return (
      <Hammer
        options={hammerOptions}
        onPan={this.handlePan}
        onPanCancel={this.handlePanCancel}
        onPanEnd={this.handlePanEnd}
        onPanStart={this.handlePanStart}
      >
        <div
          style={{
            ...styles.containerStyle,
            ...(this.state.panning
              ? styles.panningStyle
              : styles.notPanningStyle),
          }}
        >
          {this.props.children}
        </div>
      </Hammer>
    );
  }
}

export default TouchPanParameter;
