/**
 *  @file       App.jsx
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

import { MuiThemeProvider } from "@material-ui/core/styles";

import TabletView from "./views/TabletView/TabletView";
import { theme } from "constants/colors";
import StatusBar from "components/statusbar/StatusBar";

const styles = {
  containerStyle: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    minHeight: "100%",
  },
};

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="container-fluid" style={styles.containerStyle}>
        <StatusBar />
        <TabletView />
      </div>
    </MuiThemeProvider>
);
};

export default App;
