import React from 'react';
import Hammer from 'react-hammerjs';
import { DIRECTION_UP, DIRECTION_DOWN } from 'hammerjs';

const styles = {
  containerStyle: {
    width: '48px',
    height: '48px'
  }
};

const hammerOptions = {
      touchAction: 'compute',
      recognizers: {
        pan: {
          threshold: 1
        }
      }
};

const noop = function () {};


class TouchPanParameter extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      panning: false,
      panAmount: 0
    };
  }
  handlePan = (e) => {

    const {
      panCallbackAmount = 5,
      valueChangeThreshold = 5 * 15,
      tickUp = noop,
      tickDown = noop
    } = this.props;

    let panAmount = this.state.panAmount;
    switch (e.direction) {
      case DIRECTION_UP:
        panAmount -= panCallbackAmount;

        if (panAmount < -1.0 * valueChangeThreshold) {
          this.setState({
            panAmount: 0
          });
          tickUp();
        } else {
          this.setState({
            panAmount
          });
        }
        break;

      case DIRECTION_DOWN:
        panAmount += panCallbackAmount;
        if (panAmount > valueChangeThreshold) {
          this.setState({
            panAmount: 0
          });
          tickDown();
        } else {
          this.setState({
            panAmount
          });
        }
        break;
      
      default:
        break;
    }

  }
  handlePanStart = (e) => {
    const { panStart = noop } = this.props;
    this.setState({
      panning: true,
      panAmount: 0,
    });
    panStart();
  };

  handlePanEnd = (e) => {
    const { panEnd = noop } = this.props;
    this.setState({
      panning: false,
    });
    panEnd();
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
        <div style={styles.containerStyle}></div>
      </Hammer>
    );
  }
};

export default TouchPanParameter;
