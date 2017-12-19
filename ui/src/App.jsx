import { createStore } from "redux"
import React from 'react';
import Piano from './Piano';

const electron = window.require('electron');
const fs = electron.remote.require('fs');
const ipcRenderer  = electron.ipcRenderer;

class App extends React.Component {
  constructor (props) {
    super(props);
    console.log("Creating store...");
    ipcRenderer.on('dispatch', (e, action) => {

      console.log("var_name");
      console.log(action);

    });
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12">
            <Piano />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
