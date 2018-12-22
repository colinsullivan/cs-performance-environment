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
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';

import TouchButton from 'components/TouchButton';
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
      <div>
        <div className="row">
          <div className="col">
            <TouchButton
              icon={<KeyboardArrowLeft />}
              onClick={() => this.setState({
                startingOctave: Math.max(0, startingOctave - 1)
              })}
            />
            <span>C{startingOctave} - C{startingOctave + numOctaves}</span>
            <TouchButton
              icon={<KeyboardArrowRight />}
              onClick={() => this.setState({
                startingOctave: startingOctave + 1
              })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <SynkopaterPiano
              sequencerId={sequencerId}
              keyBaseWidth={2.5}
              numOctaves={numOctaves}
              startingOctave={startingOctave}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default TouchSynkopaterPiano;
