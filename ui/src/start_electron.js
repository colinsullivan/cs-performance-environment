import { createStore, applyMiddleware } from "redux"
import SCController from './SCController';
import SCStoreController from "./SCStoreController"
import AbletonLinkController from "./AbletonLinkController"
import awakeningSequencers from "awakening-sequencers"

import rootReducer from './reducers';
import * as actionTypes from './actionTypes'

console.log("actionTypes");
console.log(actionTypes);

const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain;

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

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




console.log("Creating store...");
var dispatcherMiddleware = store => next => action => {
  mainWindow.webContents.send('dispatch', action);
  let result = next(action);
  return result;
};
var store = createStore(rootReducer, applyMiddleware(dispatcherMiddleware));

console.log("Creating SCController...");
var scController = new SCController();
scController.boot().then(() => {
  console.log("Creating SCStoreController...");
  var scStoreController = new SCStoreController(store);

  let state = store.getState();
  var lastState = {
    sequencers: {
      outboardTest: {
        isReady: state.sequencers.outboardTest.isReady
      }
    }
  };

  store.subscribe(() => {
    let state = store.getState();
    let outboardTest = state.sequencers.outboardTest;

    if (
      outboardTest.isReady != lastState.sequencers.outboardTest.isReady
    ) {
      lastState.sequencers.outboardTest.isReady = outboardTest.isReady;
      console.log("Queuing outboardTest sequencer...");

      store.dispatch(
        awakeningSequencers.actions.sequencerQueued('outboardTest')
      );
    }
  });
  
  console.log("Creating AbletonLinkController...");
  var abletonLinkController = new AbletonLinkController(store, 'abletonlink');
});
