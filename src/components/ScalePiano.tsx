import { useSelector } from "react-redux";

import Piano from "components/Piano/Piano";
import { getScale } from "common/selectors";
import {
  getNotesForScaleOctave,
  getMidiNoteNumbersFromNotes,
} from "common/models/scale";

const ScalePiano = () => {
  const scale = useSelector(getScale);
  const handleNoteSelected = (note) => {
    // TODO: manually set scale to diverge from key
    console.log(note);
  };

  const octave = -1;
  const firstOctaveNotes = getNotesForScaleOctave(scale, octave);
  const activeNotes = getMidiNoteNumbersFromNotes(firstOctaveNotes);

  return (
    <Piano
      startingOctave={-1}
      numOctaves={1}
      handleNoteClicked={handleNoteSelected}
      selectedNotes={activeNotes}
      showSelectedNoteOrder={false}
    />
  );
};

export default ScalePiano;
