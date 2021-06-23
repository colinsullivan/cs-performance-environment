import CasinoIcon from "@material-ui/icons/Casino";
import { useDispatch } from "react-redux";

import TouchButton from "components/TouchButton";

import { handleSequencerRandomizeNotes } from "common/actions";

const RandomizeNotesButton = ({ sequencerId }) => {
  const dispatch = useDispatch();

  return (
    <TouchButton
      icon={<CasinoIcon />}
      onClick={() => dispatch(handleSequencerRandomizeNotes(sequencerId))}
    />
  );
};

export default RandomizeNotesButton;
