import { CSSProperties } from "react";

import {
  defaultSelectedColor,
  defaultActiveColor,
  defaultInvalidColor,
} from "constants/colors";
import { keyClickHandler } from "./util";
import NoteNumber from "./NoteNumber";

const WhitePianoKey = ({
  selectedNotes,
  note,
  handleKeyClicked,
  selected,
  active,
  invalid,
  keyBaseWidth,
  selectedColor = defaultSelectedColor,
  activeColor = defaultActiveColor,
  invalidColor = defaultInvalidColor,
  showSelectedNoteOrder,
}) => {
  const containerStyle: CSSProperties = {
    borderRight: "1px solid black",
    borderBottom: "none",
    position: "relative",
    display: "inline-block",
    backgroundColor: "white",
    width: `${keyBaseWidth}em`,
    height: "100%",
    pointerEvents: "all",
  };

  if (selected) {
    containerStyle.backgroundColor = selectedColor;
  }

  if (active) {
    containerStyle.backgroundColor = activeColor;
  }

  if (invalid) {
    containerStyle.backgroundColor = invalidColor;
  }

  return (
    <div
      style={containerStyle}
      onClick={(e) => keyClickHandler(e, note, handleKeyClicked)}
    >
      {selected && showSelectedNoteOrder ? (
        <NoteNumber selectedNotes={selectedNotes} note={note} />
      ) : null}
    </div>
  );
};

export default WhitePianoKey;
