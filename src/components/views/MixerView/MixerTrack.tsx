import { TrackProps } from "./types";
import VolumeSlider from "./VolumeSlider";
const MixerTrack = ({ track }: TrackProps) => (
  <div>
    <div>{track.name}</div>
    <VolumeSlider track={track} />
  </div>
);

export default MixerTrack;
