import { ABLETON_SESSION_STATE_UPDATE, AllActionTypes } from "common/actions";
import { createAbletonState } from "common/models/ableton";
import { AbletonState } from "common/models/ableton/api";

const abletonReducer = (
  state: AbletonState = createAbletonState(),
  action: AllActionTypes
) => {
  switch (action.type) {
    case ABLETON_SESSION_STATE_UPDATE:
      return {
        ...state,
        session: action.payload,
      };
    default:
      return state;
  }
};

export default abletonReducer;
