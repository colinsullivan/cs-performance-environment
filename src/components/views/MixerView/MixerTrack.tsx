import { createUseStyles } from "react-jss";
import MuteButton from "./MuteButton";
import SendControl from "./SendControl";
import { TrackProps } from "./types";
import VolumeSlider from "./VolumeSlider";

const useStyles = createUseStyles({
  mixerTrack: {
    fontSize: "10px",
  },
});

const MixerTrack = ({ track }: TrackProps) => {
  const styles = useStyles();
  return (
    <div className={styles.mixerTrack}>
      <div>{track.name}</div>
      <SendControl track={track} sendName={"sendA"} label={"A"} />
      <VolumeSlider track={track} />
      <MuteButton track={track} />
    </div>
  );
};

export default MixerTrack;
