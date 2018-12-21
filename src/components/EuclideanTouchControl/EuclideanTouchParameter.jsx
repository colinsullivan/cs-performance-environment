/**
 *  @file       EuclideanTouchParameter.jsx
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

import React from 'react';

import { turquoiseTransparentColor, getRGBAString } from 'constants/colors';
import TouchPanParameter from 'components/TouchPanParameter';


const styles = {
  containerStyle: {
    //backgroundColor: getRGBAString(turquoiseTransparentColor)
  },
  numberContainer: {
    height: '48px',
    width: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
};

class EuclideanTouchParameter extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      touching: false
    };
  }
  handleTouchParamUp = () => {
    this.props.onChange(Math.max(0, this.props.value - 1));
  };

  handleTouchParamDown = () => {
    this.props.onChange(this.props.value + 1);
  };

  handlePanStart = () => {
    this.setState({
      touching: true
    });
  };

  handlePanEnd = () => {
    this.setState({
      touching: false
    });
  };

  render() {
    const { value } = this.props;
    return (
      <div style={styles.containerStyle}>
        <TouchPanParameter
          panStart={this.handlePanStart}
          tickUp={this.handleTouchParamUp}
          tickDown={this.handleTouchParamDown}
          panEnd={this.handlePanEnd}
        >
          <div style={styles.numberContainer}>
            <span>{value}</span>
          </div>
        </TouchPanParameter>
      </div>
    );
  }
};

export default EuclideanTouchParameter;
