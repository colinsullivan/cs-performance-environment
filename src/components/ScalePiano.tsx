import { useDispatch } from "react-redux";

import Piano from "components/Piano/Piano";

const ScalePiano = () => {
  const handleNoteSelected = (note) => {
    console.log(note);
  };
  return (
    <Piano
      startingOctave={0}
      numOctaves={1}
      handleNoteClicked={handleNoteSelected}
      selectedNotes={[]}
      activeNotes={[]}
      showSelectedNoteOrder={false}
    />
  );
};

export default ScalePiano;
