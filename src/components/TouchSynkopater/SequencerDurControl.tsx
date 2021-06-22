import { useSelector } from "react-redux";

import SequencerParamTouchSelector from "components/SequencerParamTouchSelector";
import { durOptions } from "constants/options";
import { getSequencer } from "common/selectors";
import { SynkopaterSequencer } from "common/models/types";

interface SequencerDurControlProps {
  sequencerId: string;
}
const SequencerDurControl = (props: SequencerDurControlProps) => {
  const { sequencerId } = props;
  const seq: SynkopaterSequencer = useSelector((state) =>
    getSequencer(state, props)
  );
  return (
    <SequencerParamTouchSelector
      sequencerId={sequencerId}
      param="dur"
      options={durOptions}
      isDisabled={seq.euclidBounceEnabled}
    />
  );
};

export default SequencerDurControl;
