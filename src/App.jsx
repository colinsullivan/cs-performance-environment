/**
 *  @file       App.jsx
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

import { connect } from 'react-redux';
import React from 'react';
import Transport from './Transport';
import Synkopater from './Synkopater';


class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Transport />
        </div>
        <Synkopater sequencerId='synkopaterA'/>
        <Synkopater sequencerId='synkopaterB'/>
      </div>
    );
  }
}

export default connect()(App);
