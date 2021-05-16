import { Key } from "@tonaljs/tonal";
import { MajorKey, MinorKey } from "@tonaljs/key";

import { KeyTonic, KeyQuality } from "common/models/scale";

export const SET_KEY = "SET_KEY";

interface SetKeyAction {
  type: typeof SET_KEY;
  payload: {
    tonic: KeyTonic;
    quality: KeyQuality,
    tonalJSKey: MajorKey | MinorKey
  }
}

export const setKey = (tonic: KeyTonic, quality: KeyQuality, tonalJSKey: MajorKey | MinorKey): SetKeyAction => ({
  type: SET_KEY,
  payload: {
    tonic,
    quality,
    tonalJSKey
  }
});

export const handleSetKey = (tonic: KeyTonic, quality: KeyQuality) => (dispatch) => {
  const tonalJSKey = quality === "major" ? Key.majorKey(tonic) : Key.minorKey(tonic);
  dispatch(setKey(tonic, quality, tonalJSKey))
};
