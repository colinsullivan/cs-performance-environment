/**
 *  @file       start_electron.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

import path from 'path';
import url from 'url';
import electron from 'electron';
import { createStore, applyMiddleware } from "redux"
import express from 'express';
import expressWebsocket from 'express-ws';
import SCController from './SCController';
import supercolliderRedux from 'supercollider-redux';
import awakeningSequencers from "awakening-sequencers"
import LaunchControlXLDispatcher from './LaunchControlXLDispatcher';
import WebsocketServerDispatcher from './WebsocketServerDispatcher';

import rootReducer, {create_default_state} from './reducers';
import * as actionTypes from './actionTypes'

const SCStoreController = supercolliderRedux.SCStoreController;

//const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

//const path = require('path');
//const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1440, height: 900})

  // and load the index.html of the app.
  if (process.env.NODE_ENV == "development") {
    console.log("development");
    mainWindow.loadURL("http://localhost:3000");
  } else {
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const wsServerDispatcher = new WebsocketServerDispatcher();
console.log("Creating store...");
//var dispatcherMiddleware = store => next => action => {
  //if (!action.fromRenderer) {
    //if (mainWindow) {
      //mainWindow.webContents.send('dispatch', action);
    //}
  //}
  //let result = next(action);
  //return result;
//};
var loggerMiddleware = store => next => action => {
  console.log('will dispatch', action)

  // Call the next dispatch method in the middleware chain.
  let returnValue = next(action)

  console.log('state after dispatch', store.getState())

  // This will likely be the action itself, unless
  // a middleware further in chain changed it.
  return returnValue
};
var middleware = [wsServerDispatcher.middleware];

//middleware.push(loggerMiddleware);
//middleware.push(dispatcherMiddleware);

var store = createStore(
  rootReducer,
  create_default_state(),
  applyMiddleware(...middleware)
);

//ipcMain.on('getState', function (e) {
  //e.returnValue = store.getState();
//});

//ipcMain.on("dispatch", function (e, action) {
  //action.fromRenderer = true;
  //store.dispatch(action);
//});

console.log("Creating SCController...");
var scController = new SCController();
scController.boot().then(() => {
  console.log("Creating SCStoreController...");
  var scStoreController = new SCStoreController(store);

  let state = store.getState();
}).catch(function (err) {
  console.log("error while starting up...");
  throw err;
});

const server = express();
expressWebsocket(server);

if (process.env.NODE_ENV === 'development') {
  server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });
  server.use(express.static('public'));
}


server.get('/getState', function (req, res, next) {
  res.json(store.getState());
});
server.ws('/:clientId', function (ws, req) {
  const clientId = req.params.clientId;
  //const unsubscribe = store.subscribe(function () {
    //ws.send(JSON.stringify(store.getState()));
  //});
  console.log(`client ${clientId} connected.`);
  ws.on('message', function (msg) {
    const action = JSON.parse(msg);
    store.dispatch(action);
  });
  ws.on('close', function () {
    wsServerDispatcher.removeClient(clientId);
    //unsubscribe();
  });
  wsServerDispatcher.addClient(clientId, ws);
});

if (process.env.NODE_ENV === 'development') {
  server.listen(3001);
}
