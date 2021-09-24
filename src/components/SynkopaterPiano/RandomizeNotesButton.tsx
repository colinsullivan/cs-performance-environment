import CasinoIcon from "@material-ui/icons/Casino";
import { useDispatch } from "react-redux";

import TouchButton from "components/TouchButton";

import { handleSequencerRandomizeNotes } from "common/actions";

import "./RandomizeNotesButton.scss";

const RandomizeNotesButton = ({ sequencerId, numNotesToRandomize }) => {
  const dispatch = useDispatch();

  return (
    <div className="randomize-notes-button">
      {numNotesToRandomize === null ? null : <div className="number">{ numNotesToRandomize }</div>}
      <TouchButton
        icon={<CasinoIcon />}
        onClick={() => dispatch(handleSequencerRandomizeNotes(sequencerId, numNotesToRandomize))}
      />
    </div>
  );
};

export default RandomizeNotesButton;
