import React from 'react';

import SynkopaterPiano from './SynkopaterPiano';

class TouchSynkopater extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <SynkopaterPiano
            sequencerId={this.props.sequencerId}
            keyBaseWidth={3}
          />
        </div>
      </div>
    );
  }
};

export default TouchSynkopater;
