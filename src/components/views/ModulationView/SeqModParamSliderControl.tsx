import styled from "styled-components";
import { useCallback, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Nexus from "nexusui";

import { midToneColor, getRGBAString } from "constants/colors";
import { MidiCCRange } from "common/models";
import { sequencersSelector } from "common/selectors";
import {
  sequencer_update_mod,
  sequencer_update_mod_length,
} from "common/actions";
import { modSequenceLengthOptions } from "constants/options";
import ParamTouchSelector from "components/ParamTouchSelector";

const NO_OP = () => {}; // eslint-disable-line

interface MultisliderProps {
  id: string;
  size: number[];
  max: number;
  min: number;
  smoothing: number;
  step: number;
  values: number[];
  candycane: number;
  onChange: (newState: { index: number; value: number }) => void;
  onReady?: (slider) => void;
}

const Multislider = ({
  id,
  size,
  max,
  min,
  smoothing,
  step,
  values,
  candycane,
  onChange = NO_OP,
  onReady = NO_OP,
}: MultisliderProps) => {
  const multislider = useRef<null | Nexus.Multislider>(null);
  const elementId = useRef(`nexus-ui-multislider-${id}`);
  const initializeMultislider = useCallback(() => {
    multislider.current = new Nexus.Multislider(elementId.current, {
      numberOfSliders: values.length,
      size,
      max,
      min,
      smoothing,
      step,
      values,
      candycane,
    });
    onReady(multislider.current);
    multislider.current.on(
      "change",
      (newState: { index: number; value: number }) => {
        onChange(newState);
      }
    );
    return () => {
      multislider.current.destroy();
    };
  }, [
    candycane,
    max,
    min,
    multislider,
    onChange,
    onReady,
    size,
    smoothing,
    step,
    values,
  ]);

  useEffect(initializeMultislider, []); // eslint-disable-line

  useEffect(() => {
    if (multislider.current === null) return;
    if (min === undefined) return;
    multislider.current.min = min;
  }, [min]);

  useEffect(() => {
    if (multislider.current === null) return;
    if (max === undefined) return;
    multislider.current.max = max;
  }, [max]);
  useEffect(() => {
    if (multislider.current === null) return;
    if (smoothing === undefined) return;
    multislider.current.smoothing = smoothing;
  }, [smoothing]);
  useEffect(() => {
    if (multislider.current === null) return;
    if (step === undefined) return;
    multislider.current.step = step;
  }, [step]);

  // This required updating from react-nexusui
  // TODO: Contribute this back to the Multislider interface there.
  const prevSize = useRef<number[]>(size);
  useEffect(() => {
    if (multislider.current === null) return;
    if (values === undefined || !Array.isArray(values)) return;
    if (!Array.isArray(size)) {
      return;
    }

    // When updating the size and number of sliders simultaneously,
    // the operations need to be synchronized in this order.
    console.log("set all sliders");
    multislider.current.setAllSliders(values);
    // Only calls resize if the size has actually changed.
    if (prevSize.current[0] !== size[0] || prevSize.current[1] !== size[1]) {
      prevSize.current = size;
      console.log("resize");
      multislider.current.resize(...size);
    }
  }, [values, size]);
  return <div id={elementId.current} />;
};

const SliderContainer = styled.div`
  div svg {
    background-color: transparent !important;
    border: 1px solid ${getRGBAString(midToneColor)};
    width: auto !important;
  }
`;

const SynkModSeqSliders = ({ sequencerId, modParam }) => {
  const dispatch = useDispatch();
  const sequencers = useSelector(sequencersSelector);
  const handleSlidersChanged = useCallback(
    (newValues) => {
      dispatch(sequencer_update_mod(sequencerId, modParam, newValues));
    },
    [dispatch, sequencerId, modParam]
  );

  const handleLengthChanged = useCallback(
    (newLength) => {
      dispatch(sequencer_update_mod_length(sequencerId, modParam, newLength));
    },
    [dispatch, sequencerId, modParam]
  );

  const sequencer = sequencers[sequencerId];
  if (!sequencer) {
    return null;
  }
  const sliderWidth = 32;
  const values = sequencer[modParam];

  return (
    <div>
      <p>{modParam}</p>
      <ParamTouchSelector
        labelText="length"
        options={modSequenceLengthOptions}
        value={values.length}
        onChange={handleLengthChanged}
      />
      <SliderContainer>
        <Multislider
          id={`${sequencerId}-${modParam}`}
          size={[sliderWidth * values.length, 100]}
          min={MidiCCRange[0]}
          max={MidiCCRange[1]}
          step={1}
          candycane={2}
          values={values}
          smoothing={0}
          onChange={handleSlidersChanged}
        />
      </SliderContainer>
    </div>
  );
};

export default SynkModSeqSliders;
