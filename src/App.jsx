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
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TabletView from './TabletView';
import LaptopView from './LaptopView';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container-fluid">
          <Switch>
            <Route exact path="/laptop" component={LaptopView} />
            <Route path="" component={TabletView} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect()(App);
