import { connect } from 'react-redux';
import React from 'react';
import Piano from './Piano';
import Transport from './Transport';


class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Transport />
        </div>
        <div className="row">
          <div className="col-xs-12">
            <Piano />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(App);
