import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import LabeledDropdown from "components/LabeledDropdown";
import { getSequencer } from "common/selectors";
import { SynkopaterSequencer } from "common/models/types";
import { getGlobalQuant } from "common/models/synkopater";
import { synkopater_global_quant_updated } from "common/actions";

const options = [
  {
    label: "1",
    value: 1,
  },
  {
    label: "3",
    value: 3,
  },
  {
    label: "4",
    value: 4,
  },
  {
    label: "5",
    value: 5,
  },
  {
    label: "7",
    value: 7,
  },
];

const QuantDropdown = (props: { sequencerId: string }) => {
  const dispatch = useDispatch();
  const seq: SynkopaterSequencer = useSelector((state) =>
    getSequencer(state, props)
  );
  const globalQuant = getGlobalQuant(seq);
  const handleChanged = useCallback((e: any) => {
    const newValue = e.target.value;
    dispatch(synkopater_global_quant_updated(props.sequencerId, newValue));
  }, []);
  return globalQuant ? (
    <LabeledDropdown
      label="quant"
      options={options}
      value={globalQuant}
      onChange={handleChanged}
    />
  ) : null;
};

export default QuantDropdown;
