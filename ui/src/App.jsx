import React, { Component } from 'react';
import Piano from './Piano';

const electron = window.require('electron');
const fs = electron.remote.require('fs');
const ipcRenderer  = electron.ipcRenderer;

class App extends Component {
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
