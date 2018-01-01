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
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import App from './App.jsx';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux"
import rootReducer from './reducers';
//import registerServiceWorker from './registerServiceWorker';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

var dispatcherMiddleware = store => next => action => {
  if (!action.fromMain) {
    ipcRenderer.send('dispatch', action);
  }
  return next(action);
};
var store = createStore(
  rootReducer,
  ipcRenderer.sendSync('getState'),
  applyMiddleware(dispatcherMiddleware)
);

ReactDOM.render((
    <Provider store={store}>
      <App />
    </Provider>
), document.getElementById('root'));
//registerServiceWorker();

ipcRenderer.on('dispatch', function (e, action) {
  action.fromMain = true;
  store.dispatch(action);
});


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
