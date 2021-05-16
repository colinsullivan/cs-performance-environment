import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ParamTouchSelector from "components/ParamTouchSelector";
import { KeyMenuOption } from './types';
import { KeyTonic, KeyQuality } from "common/models/scale";
import { getScale } from "common/selectors";
import { MenuOptionValue } from "components/types";
import { handleSetKey } from "common/actions/scale";

const tonics: KeyTonic[] = [
  "C",
  "D",
  "E",
  "F",
  "G",
  "A",
  "B"
];

const qualities: KeyQuality[] = ["major", "minor"];

const options: KeyMenuOption[] = [];

qualities.forEach((quality) => {
  tonics.forEach((tonic) => {
    options.push({
      label: `${tonic} ${quality}`,
      value: `${tonic} ${quality}`,
      tonic,
      quality
    })
  });
});

const findOptionForScale = (scale) => scale.key ? options.find(o => o.tonic === scale.key.tonic && o.quality === scale.key.quality) : null;
const findOptionFromValue = (value: MenuOptionValue) => options.find(o => o.value === value);

const KeyTouchSelector = () => {
  const dispatch = useDispatch();
  const scale = useSelector(getScale);
  const currentOption = findOptionForScale(scale);
  const handleChanged = useCallback((value: MenuOptionValue) => {
    const option = findOptionFromValue(value);
    if (option) {
      dispatch(handleSetKey(option.tonic, option.quality));
    }
  }, [dispatch]);
  return (
    <ParamTouchSelector
      labelText="Key"
      options={options}
      value={currentOption ? currentOption.value : ""}
      onChange={handleChanged}
    />
  );
};

export default KeyTouchSelector;
