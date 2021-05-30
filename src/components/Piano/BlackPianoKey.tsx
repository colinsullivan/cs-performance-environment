import { CSSProperties } from "react";

import {
  defaultSelectedColor,
  defaultActiveColor,
  defaultInvalidColor,
  blackKeyOutOfScaleColor
} from "constants/colors";
import NoteNumber from "./NoteNumber";
import { keyClickHandler } from "./util";

const BlackPianoKey = ({
  selectedNotes,
  note,
  index,
  handleKeyClicked,
  selected,
  active,
  invalid,
  outOfScale,
  blackKeyBaseWidthRatio,
  keyBaseWidth,
  selectedColor = defaultSelectedColor,
  activeColor = defaultActiveColor,
  invalidColor = defaultInvalidColor,
  showSelectedNoteOrder,
  showNotesInScale
}) => {
  const containerStyle: CSSProperties = {
    backgroundColor: "black",
    width: `${blackKeyBaseWidthRatio * keyBaseWidth}em`,
    height: "50%",
    display: "inline-block",
    pointerEvents: "all",
    position: "relative",
  };

  if (outOfScale && showNotesInScale) {
    containerStyle.backgroundColor = blackKeyOutOfScaleColor;
  }
  if (selected || active) {
    containerStyle.border = "1px solid black";
  }
  if (selected) {
    containerStyle.backgroundColor = selectedColor;
  }

  if (active) {
    containerStyle.backgroundColor = activeColor;
  }

  if (invalid) {
    containerStyle.backgroundColor = invalidColor;
  }

  if (index > 0) {
    if ([1, 6].includes(note.chroma)) {
      containerStyle.marginLeft = `${
        blackKeyBaseWidthRatio * keyBaseWidth + keyBaseWidth
      }em`;
    } else {
      containerStyle.marginLeft = `${blackKeyBaseWidthRatio * keyBaseWidth}em`;
    }
  } else {
    containerStyle.marginLeft = `${
      0.5 * blackKeyBaseWidthRatio * keyBaseWidth
    }em`;
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

export default BlackPianoKey;
