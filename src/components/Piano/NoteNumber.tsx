import styled from "styled-components";

import { defaultNoteNumberColor } from "constants/colors";

const NoteNumberContainer = styled.div`
  position: absolute;
  color: ${defaultNoteNumberColor};
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

const NoteNumber = ({ selectedNotes, note }) => {
  const number = selectedNotes.indexOf(note.midi) + 1;
  return <NoteNumberContainer>{number}</NoteNumberContainer>;
};

export default NoteNumber;
