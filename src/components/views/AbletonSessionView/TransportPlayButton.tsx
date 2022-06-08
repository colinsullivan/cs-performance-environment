import { Pause, PlayArrow } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";

import { getIsPlaying } from "common/selectors";
import TouchButton from "components/TouchButton";
import { abletonTransportPause, abletonTransportPlay } from "common/actions";

const TransportPlayButton = () => {
  const dispatch = useDispatch();
  const isPlaying = useSelector(getIsPlaying);
  const handleClick = () => {
    if (isPlaying) {
      dispatch(abletonTransportPause());
    } else {
      dispatch(abletonTransportPlay());
    }
  }

  const icon = isPlaying ? <Pause /> : <PlayArrow />;

  return <TouchButton onClick={handleClick} icon={icon} />;
};

export default TransportPlayButton;
