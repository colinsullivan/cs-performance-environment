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
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";

import TouchButton from "components/TouchButton";
import SynkopaterPiano from "components/SynkopaterPiano";
import TransposeButton from "./TransposeButton";
import { TRANSPOSE_DIRECTION } from "common/models/synkopater";

const numOctaves = 3;

const TouchSynkopaterPiano = ({ sequencerId }) => {
  const [startingOctave, setStartingOctave] = useState(5);

  return (
    <div>
      <div className="row">
        <div className="col">
          <TouchButton
            icon={<KeyboardArrowLeft />}
            onClick={() => setStartingOctave(Math.max(0, startingOctave - 1))}
          />
          <span>
            C{startingOctave} - C{startingOctave + numOctaves}
          </span>
          <TouchButton
            icon={<KeyboardArrowRight />}
            onClick={() => setStartingOctave(startingOctave + 1)}
          />
        </div>
        <div className="col">
          <TransposeButton sequencerId={sequencerId} transposeDirection={TRANSPOSE_DIRECTION.DOWN} />
          <span>transpose</span>
          <TransposeButton sequencerId={sequencerId} transposeDirection={TRANSPOSE_DIRECTION.UP} />
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
