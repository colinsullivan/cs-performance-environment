import { TrackProps } from "./types";
import DeviceParamSlider from "./DeviceParamSlider";
import { mixerChannelHalfWidth } from "constants/ui";

const height = 150;

const VolumeSlider = ({ track }: TrackProps) => {
  return (
    <DeviceParamSlider
      track={track}
      height={height}
      width={mixerChannelHalfWidth}
      deviceParamName={"volume"}
    />
  );
};

export default VolumeSlider;
