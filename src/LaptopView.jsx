import React from 'react';
import Synkopater from './Synkopater';

class LaptopView extends React.Component {
  render() {
    return (
      <div>
        <Synkopater
          componentId='synkopaterA'
          sequencerId='synkopaterA'
        />
        <Synkopater
          componentId='synkopaterB'
          sequencerId='synkopaterB'
        />
      </div>
    );
  }
};

export default LaptopView;
