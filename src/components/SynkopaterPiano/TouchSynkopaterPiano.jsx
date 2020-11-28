/**
 *  @file       TouchSynkopaterPiano.jsx
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

import React, { useState } from "react";
import SynkopaterPiano from "components/SynkopaterPiano";
import TouchTransposeControl from "./TouchTransposeControl";
import TouchOctaveControl from "./TouchOctaveControl";
import { numOctaves } from './constants';
import PresetControl from './PresetControl/PresetControl';

const TouchSynkopaterPiano = ({ sequencerId, componentId }) => {
  const [startingOctave, setStartingOctave] = useState(5);

  return (
    <div>
      <div className="row">
        <TouchTransposeControl sequencerId={sequencerId} />
        <TouchOctaveControl
          sequencerId={sequencerId}
          startingOctave={startingOctave}
          setStartingOctave={setStartingOctave}
        />
        <PresetControl sequencerId={sequencerId} componentId={componentId} />
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
};

export default TouchSynkopaterPiano;
