import styled from "styled-components";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Multislider } from "react-nexusui";

import { midToneColor, getRGBAString } from "constants/colors";
import { MidiCCRange } from "common/models";
import { sequencersSelector } from "common/selectors";
import { sequencer_update_mod } from "common/actions";

const SliderContainer = styled.div`
  div svg {
    background-color: transparent !important;
    border: 1px solid ${getRGBAString(midToneColor)};
  }
`


const SynkModSeqSliders = ({ sequencerId, modParam }) => {
  const dispatch = useDispatch();
  const sequencers = useSelector(sequencersSelector);
  const handleSlidersChanged = useCallback((newValues) => {
    dispatch(sequencer_update_mod(sequencerId, modParam, newValues));
  }, [dispatch, sequencerId, modParam]);

  const sequencer = sequencers[sequencerId];
  if (!sequencer) {
    return null;
  }
  const values = sequencer.velocities;

  const multiSliderProps = {
    numberOfSliders: values.length,
    min: MidiCCRange[0],
    max: MidiCCRange[1],
    step: 1,
    candycane: 2,
    values,
    smoothing: 0,
  };

  return (
    <SliderContainer>
      <Multislider
        size={[200, 100]}
        mode="bar"
        {...multiSliderProps}
        onChange={handleSlidersChanged}
      />
    </SliderContainer>
  );
};

export default SynkModSeqSliders;
