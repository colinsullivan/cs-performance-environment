/**
 *  @file       index.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from "redux"
import { Provider } from 'react-redux';
import axios from 'axios';
import uuid from 'uuid/v4';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import WebsocketDispatcher from './WebsocketDispatcher';
import App from './App';
import rootReducer from 'common/reducers';
import { PORT } from 'common/constants';

const middleware = [];

const clientId = uuid();

const wsDispatcher = new WebsocketDispatcher({
  port: PORT,
  clientId
});
middleware.push(wsDispatcher.middleware);

// get initial state then render
axios.get(
  `${window.location.protocol}//${window.location.hostname}:${PORT}/getState`
).then(function (resp) {
  const initialState = resp.data;
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );
  wsDispatcher.setStore(store);
  ReactDOM.render((
      <Provider store={store}>
        <App />
      </Provider>
  ), document.getElementById('root'));
});
