import { connect } from 'react-redux';
import React from 'react';
import Transport from './Transport';
import Synkopater from './Synkopater';


class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Transport />
        </div>
        <Synkopater sequencerId='synkopaterA'/>
      </div>
    );
  }
}

export default connect()(App);
