import React from 'react';
import iNoBounce from 'inobounce';

import TouchSynkopater from './TouchSynkopater';

class TabletView extends React.Component {
  componentDidMount () {
    iNoBounce.enable();
  }
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
