/**
 *  @file       App.jsx
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";

import TabletView from "./views/TabletView/TabletView";
import LaptopView from "./LaptopView";
import { theme } from "constants/colors";
import ConnectionStatusBar from "components/ConnectionStatusBar";

const styles = {
  containerStyle: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    minHeight: "100%",
  },
};

const App = () => {
  return (
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <div className="container-fluid" style={styles.containerStyle}>
        <ConnectionStatusBar />
        <Switch>
          <Route exact path="/laptop" component={LaptopView} />
          <Route path="" component={TabletView} />
        </Switch>
      </div>
    </MuiThemeProvider>
  </BrowserRouter>
);
};

export default App;
