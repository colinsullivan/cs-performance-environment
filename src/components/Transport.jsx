/**
 *  @file       Transport.jsx
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

import React from 'react';
import { connect } from 'react-redux';

class Transport extends React.Component {
  render () {
    return (
      <div>
        <span>
          {this.props.beat}
        </span>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    beat: Math.floor(state.abletonlink.beat)
  };
})(Transport);
