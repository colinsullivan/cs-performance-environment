import { useCallback, ChangeEvent, useState } from "react";
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
  // Whether the select is open
  const [open, setOpen] = useState(false);
  const handleOpened = () => setOpen(true);
  const handleClosed = () => setOpen(false);
  const dispatch = useDispatch();
  const seq: SynkopaterSequencer = useSelector((state) =>
    getSequencer(state, props)
  );
  const globalQuant = getGlobalQuant(seq);
  const handleChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value);
      dispatch(synkopater_global_quant_updated(props.sequencerId, newValue));
    },
    [props.sequencerId, dispatch]
  );
  return globalQuant ? (
      <LabeledDropdown
        open={open}
        label="quant"
        options={options}
        value={globalQuant}
        onChange={handleChanged}
        onOpen={handleOpened}
        onClose={handleClosed}
      />
  ) : null;
};

export default QuantDropdown;
