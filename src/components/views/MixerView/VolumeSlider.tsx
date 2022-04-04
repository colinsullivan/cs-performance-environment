import { TrackProps } from "./types";
import DeviceParamSlider from "./DeviceParamSlider";
import { mixerChannelHalfWidth } from "constants/ui";
import {QuadTrackViewModel, StereoTrackViewModel, TrackViewModel} from "common/models";

interface VolumeSliderProps {
  trackView: TrackViewModel;
}

const height = 150;

const VolumeSlider = ({ trackView }: VolumeSliderProps) => {
  return (
    <DeviceParamSlider
      trackView={trackView}
      height={height}
      width={mixerChannelHalfWidth}
      deviceParamName={"volume"}
    />
  );
};

export default VolumeSlider;
