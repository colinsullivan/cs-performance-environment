import { createUseStyles } from "react-jss";
import MuteButton from "./MuteButton";
import SendControl from "./SendControl";
import { TrackProps } from "./types";
import VolumeSlider from "./VolumeSlider";

import { mixerChannelWidth } from "constants/ui";

const useStyles = createUseStyles({
  mixerTrack: {
    fontSize: "10px",
    width: mixerChannelWidth,

    display: "flex",
    flexDirection: "column",
  },

  channelControls: {
    display: "flex",
    flexDirection: "row",
  },
});

const MixerTrack = ({ track }: TrackProps) => {
  const styles = useStyles();
  return (
    <div className={styles.mixerTrack}>
      <div>{track.name}</div>
      <div className={styles.channelControls}>
        <div>
          <VolumeSlider track={track} />
          <MuteButton track={track} />
        </div>
        <div>
          <SendControl track={track} sendName={"sendB"} label={"B"} />
          <SendControl track={track} sendName={"sendA"} label={"A"} />
        </div>
      </div>
    </div>
  );
};

export default MixerTrack;
