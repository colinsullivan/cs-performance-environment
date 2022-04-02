import { createUseStyles } from "react-jss";
import MuteButton from "./MuteButton";
import SendControl from "./SendControl";
import { TrackProps } from "./types";
import VolumeSlider from "./VolumeSlider";

import { mixerChannelWidth, mixerChannelMargin } from "constants/ui";
import QuadPanner from "./QuadPanner";

const useStyles = createUseStyles({
  mixerTrack: {
    fontSize: "10px",
    width: mixerChannelWidth,

    display: "flex",
    flexDirection: "column",

    marginRight: mixerChannelMargin,
  },

  channelControls: {
    display: "flex",
    flexDirection: "row",
  },

  channelControlsLeft: {
    marginRight: mixerChannelMargin,
  },
});

const MixerTrack = ({ track }: TrackProps) => {
  const styles = useStyles();
  return (
    <div className={styles.mixerTrack}>
      <div>
        <label>{track.name}</label>
        <QuadPanner track={track} />
      </div>

      <div className={styles.channelControls}>
        <div className={styles.channelControlsLeft}>
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
