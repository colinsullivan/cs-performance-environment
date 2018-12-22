/**
 *  @file       TouchSynkopaterPiano.jsx
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

import React from 'react';

import SynkopaterPiano from 'components/SynkopaterPiano';

class TouchSynkopaterPiano extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      numOctaves: 3,
      startingOctave: 3
    };
  }
  render() {
    const { sequencerId } = this.props;
    const { numOctaves, startingOctave } = this.state;
    return (
      <SynkopaterPiano
        sequencerId={sequencerId}
        keyBaseWidth={2.5}
        numOctaves={numOctaves}
        startingOctave={startingOctave}
      />
    );
  }
};

export default TouchSynkopaterPiano;
