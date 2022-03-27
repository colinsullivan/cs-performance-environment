/**
 *  @file       index.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import uuid from "uuid/v4";

import "./index.scss";

import WebsocketDispatcher from "dispatchers/WebsocketDispatcher";
import DebounceActionsMiddleware from "dispatchers/DebounceActionsMiddleware";
import SequencerApplyChangesService from "dispatchers/SequencerApplyChangesService";
import App from "components/App";
import { PORT } from "common/constants";
import { configureStore } from "./store";
import { fetchInitialState } from "common/util/setup";

const clientId = uuid();

const wsDispatcher = new WebsocketDispatcher({
  port: PORT,
  clientId,
  uri: `${window.location.hostname}:${PORT}`
});

const debounceActionsMiddleware = new DebounceActionsMiddleware();

const sequencerApplyChangesService = new SequencerApplyChangesService();

// get initial state then render
const main = async () => {
  const initialState = await fetchInitialState(
    `${window.location.protocol}//${window.location.hostname}:${PORT}`
  );
  const store = configureStore(
    initialState,
    wsDispatcher,
    debounceActionsMiddleware,
    sequencerApplyChangesService
  );
  wsDispatcher.setStore(store);
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
};

main();
