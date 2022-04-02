import { TrackProps } from "./types";
import DeviceParamSlider from "./DeviceParamSlider";
import { MIXER_COLUMN_WIDTH } from "constants/ui";

const height = 200;

const VolumeSlider = ({ track }: TrackProps) => {
  return (
    <DeviceParamSlider
      track={track}
      height={height}
      width={MIXER_COLUMN_WIDTH}
      deviceParamName={"volume"}
      label={"vol"}
    />
  );
};

export default VolumeSlider;
