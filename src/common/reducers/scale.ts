import { AllActionTypes } from "common/actions";

import { createDefaultScaleState, ScaleState } from "common/models/scale";
import { SET_KEY } from "common/actions";

const scale = (state = createDefaultScaleState(), action: AllActionTypes) => {
  switch (action.type) {
    case SET_KEY: {
      const { tonic, quality, tonalJSKey } = action.payload;

      let newState: ScaleState = {
        key: {
          tonic: tonic,
          quality: quality,
        },
        scale: []
      };

      // TODO: handle other minor scale qualities
      if ('natural' in tonalJSKey) {
        newState = {
          ...newState,
          scale: [...tonalJSKey.natural.scale]
        };
      } else {
        newState = {
          ...newState,
          scale: [...tonalJSKey.scale]
        };
      }

      return newState;
    }
    default:
      return state;
  }
};
export default scale;
