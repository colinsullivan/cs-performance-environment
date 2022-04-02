import SendControl from "./SendControl";
import { TrackProps } from "./types";
import VolumeSlider from "./VolumeSlider";
const MixerTrack = ({ track }: TrackProps) => (
  <div>
    <div>{track.name}</div>
    <SendControl track={track} sendName={"sendA"} label={"A"} />
    <VolumeSlider track={track} />
  </div>
);

export default MixerTrack;
