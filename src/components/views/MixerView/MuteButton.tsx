import CSS from "csstype";
import { useDispatch } from "react-redux";

import { AbletonTrack } from "common/models/ableton/api";
import { mixerChannelHalfWidth } from "constants/ui";
import TouchSquareButton from "components/TouchSquareButton/TouchSquareButton";
import {handleTrackMuted, handleTrackUnmuted} from "common/actions";
import {getRGBAString, orangeColor} from "constants/colors";

interface MuteButtonProps {
  track: AbletonTrack;
}

const MuteButton = (props: MuteButtonProps) => {
  const dispatch = useDispatch();
  const { track } = props;

  const handleTouchStart = () => {
    if (track.mute) {
      dispatch(handleTrackUnmuted(track));
    } else {
      dispatch(handleTrackMuted(track));
    }
  };

  const styles: CSS.Properties = {};
  if (!track.mute) {
    styles.backgroundColor = getRGBAString(orangeColor);
  }

  return <TouchSquareButton 
    onTouchStart={handleTouchStart}
    size={mixerChannelHalfWidth}
    styles={styles}
  />;
};

export default MuteButton;
