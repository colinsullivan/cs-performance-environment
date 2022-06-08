import { Pause, PlayArrow } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";

import { getIsPlaying } from "common/selectors";
import { abletonTransportPause, abletonTransportPlay } from "common/actions";
import { createUseStyles } from "react-jss";
import { offWhiteColor, getRGBAString } from "constants/colors";

const useStyles = createUseStyles({
  playButton: {
    background: "none",
    border: "none",
    color: getRGBAString(offWhiteColor),
  },
});

const TransportPlayButton = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const isPlaying = useSelector(getIsPlaying);
  const handleClick = () => {
    if (isPlaying) {
      dispatch(abletonTransportPause());
    } else {
      dispatch(abletonTransportPlay());
    }
  };

  const icon = isPlaying ? (
    <Pause fontSize="large" />
  ) : (
    <PlayArrow fontSize="large" />
  );

  return (
    <button onTouchEnd={handleClick} className={styles.playButton}>
      {icon}
    </button>
  );
};

export default TransportPlayButton;
