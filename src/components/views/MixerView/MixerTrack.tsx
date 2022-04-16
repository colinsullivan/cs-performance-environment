import { createUseStyles } from "react-jss";
import MuteButton from "./MuteButton";
import SendControl from "./SendControl";
import VolumeSlider from "./VolumeSlider";

import { mixerChannelWidth, mixerChannelMargin } from "constants/ui";
import QuadPanner from "./QuadPanner";
import { TrackViewModel } from "common/models";

interface MixerTrackProps {
  trackView: TrackViewModel;
}

const useStyles = createUseStyles({
  mixerTrack: {
    fontSize: "10px",
    width: mixerChannelWidth,

    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",

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

const MixerTrack = ({ trackView }: MixerTrackProps) => {
  const styles = useStyles();

  return (
    <div className={styles.mixerTrack}>
      <div>
        {trackView.trackType === "stereo" ? (
          <QuadPanner track={trackView.track} />
        ) : null}
      </div>

      <div className={styles.channelControls}>
        <div className={styles.channelControlsLeft}>
          <VolumeSlider trackView={trackView} />
          <MuteButton trackView={trackView} />
        </div>
        <div>
          <SendControl
            trackView={trackView}
            sendName={"sendA"}
            label={"verb"}
          />
          <SendControl trackView={trackView} sendName={"sendD"} label={"OT"} />
          <SendControl
            trackView={trackView}
            sendName={"sendE"}
            label={"spring"}
          />
          <SendControl trackView={trackView} sendName={"sendF"} label={"FX"} />
        </div>
      </div>

      <div>
        <label>{trackView.name}</label>
      </div>
    </div>
  );
};

export default MixerTrack;
