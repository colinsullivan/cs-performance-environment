import React, { Component } from 'react';
import Piano from './Piano';

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
