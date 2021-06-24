import { AllActionTypes, SYSTEM_TEMPO_CHANGED } from "common/actions";

const tempo = (state = 2, action: AllActionTypes) => {
  switch (action.type) {
    case SYSTEM_TEMPO_CHANGED:
      return action.payload.tempo;
    default:
      return state;
  }
};

export default tempo;
