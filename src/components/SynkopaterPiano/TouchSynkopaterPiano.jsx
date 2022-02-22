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
import RandomizeNotesButton from "./RandomizeNotesButton";

const TransposeControls = styled.div`
  > div {
    display: inline-block;
  }
`;

const AboveKeyboardRowContainer = styled.div`
  margin-bottom: 12px;
`

const TouchSynkopaterPiano = ({ sequencerId, componentId }) => {
  const [startingOctave, setStartingOctave] = useState(5);

  return (
    <div>
      <AboveKeyboardRowContainer>
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
            <RandomizeNotesButton sequencerId={sequencerId} numNotesToRandomize={null} />
            <RandomizeNotesButton sequencerId={sequencerId} numNotesToRandomize={1} />
            <RandomizeNotesButton sequencerId={sequencerId} numNotesToRandomize={2} />
          </div>
          <div className="col">
            <PresetControl sequencerId={sequencerId} componentId={componentId} />
          </div>
        </div>
      </AboveKeyboardRowContainer>
      <div className="row">
        <div className="col">
          <SynkopaterPiano
            sequencerId={sequencerId}
            numOctaves={numOctaves}
            startingOctave={startingOctave}
          />
        </div>
      </div>
    </div>
  );
};

export default TouchSynkopaterPiano;
