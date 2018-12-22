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
import { MuiThemeProvider  } from '@material-ui/core/styles';

import TabletView from './TabletView';
import LaptopView from './LaptopView';
import { theme } from 'constants/colors';

const styles = {
  containerStyle: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%'
  }
};

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <div className="container-fluid" style={styles.containerStyle}>
            <Switch>
              <Route exact path="/laptop" component={LaptopView} />
              <Route path="" component={TabletView} />
            </Switch>
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default connect()(App);
