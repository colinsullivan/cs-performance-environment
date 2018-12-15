import React from 'react';

import TouchSynkopater from './TouchSynkopater';

class TabletView extends React.Component {
  render() {
    return (
      <div>
        <TouchSynkopater
          componentId='synkopaterA'
          sequencerId='synkopaterA'
        />
        <TouchSynkopater
          componentId='synkopaterB'
          sequencerId='synkopaterB'
        />
      </div>
    );
  }
};

export default TabletView;
