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
//import registerServiceWorker from './registerServiceWorker';

//const electron = window.require('electron');
//const ipcRenderer  = electron.ipcRenderer;
//

const middleware = [];

const clientId = uuid();

const wsDispatcher = new WebsocketDispatcher({
  port: PORT,
  clientId
});
middleware.push(wsDispatcher.middleware);

//var dispatcherMiddleware = store => next => action => {
  //if (!action.fromMain) {
    //ipcRenderer.send('dispatch', action);
  //}
  //return next(action);
//};

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


//registerServiceWorker();

//ipcRenderer.on('dispatch', function (e, action) {
  //action.fromMain = true;
  //store.dispatch(action);
//});


//var lastlink = null;
//store.subscribe(() => {
  //let state = store.getState();

  //if (lastlink === null) {
    //lastlink = state.abletonlink;
  //} else {
    //console.log("lastlink === state.abletonlink");
    //console.log(lastlink === state.abletonlink);
    //console.log("state.abletonlink");
    //console.log(state.abletonlink);
  //}

//});
