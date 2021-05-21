import styled from "styled-components";
import { Multislider } from "react-nexusui";
import { midToneColor, getRGBAString } from "constants/colors";
import { MidiCCRange } from "common/models";

const SliderContainer = styled.div`
  div svg {
    background-color: transparent !important;
    border: 1px solid ${getRGBAString(midToneColor)};
  }
`

const ModulationView = () => {
  const values = [64, 32];
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
      />
    </SliderContainer>
  );
};

export default ModulationView;
