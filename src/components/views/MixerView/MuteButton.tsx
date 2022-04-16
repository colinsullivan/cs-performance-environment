import CSS from "csstype";
import { useDispatch } from "react-redux";

import { mixerChannelHalfWidth } from "constants/ui";
import TouchSquareButton from "components/TouchSquareButton/TouchSquareButton";
import { handleTrackMuted, handleTrackUnmuted } from "common/actions";
import { getRGBAString, orangeColor } from "constants/colors";
import { getCanonicalTrack, TrackViewModel } from "common/models";

interface MuteButtonProps {
  trackView: TrackViewModel;
}

const MuteButton = (props: MuteButtonProps) => {
  const dispatch = useDispatch();
  const { trackView } = props;

  const track = getCanonicalTrack(trackView);

  const handleTouchStart = () => {
    if (track.mute) {
      dispatch(handleTrackUnmuted(trackView));
    } else {
      dispatch(handleTrackMuted(trackView));
    }
  };

  const styles: CSS.Properties = {};
  if (!track.mute) {
    styles.backgroundColor = getRGBAString(orangeColor);
  }

  return (
    <TouchSquareButton
      onTouchStart={handleTouchStart}
      size={mixerChannelHalfWidth}
      styles={styles}
    />
  );
};

export default MuteButton;
