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
import styled from "styled-components";

import SynkopaterPiano from "components/SynkopaterPiano";
import TouchTransposeControl from "./TouchTransposeControl";
import TouchOctaveControl from "./TouchOctaveControl";
import { numOctaves } from "./constants";
import PresetControl from "./PresetControl/PresetControl";

const TransposeControls = styled.div`
  > div {
    display: inline-block;
  }
`;

const TouchSynkopaterPiano = ({ sequencerId, componentId }) => {
  const [startingOctave, setStartingOctave] = useState(5);

  return (
    <div>
      <div className="row">
        <div className="col">
          <TransposeControls>
            <TouchTransposeControl sequencerId={sequencerId} />
            <TouchOctaveControl
              startingOctave={startingOctave}
              setStartingOctave={setStartingOctave}
            />
          </TransposeControls>
        </div>
        <div className="col">
          <PresetControl sequencerId={sequencerId} componentId={componentId} />
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
};

export default TouchSynkopaterPiano;
