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

const styles = {
  containerStyle: {
    
  }
};

class EuclideanTouchParameter extends React.Component {
  render() {
    const { value } = this.props;
    return (
      <div style={styles.containerStyle}>{value}</div>
    );
  }
};

export default EuclideanTouchParameter;
