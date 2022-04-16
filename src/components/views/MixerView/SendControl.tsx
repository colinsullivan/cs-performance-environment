import { AbletonSendName } from "common/models/ableton/api";
import DeviceParamSlider from "./DeviceParamSlider";
import { mixerChannelHalfWidth } from "constants/ui";
import { TrackViewModel } from "common/models";

interface SendControlProps {
  trackView: TrackViewModel;
  sendName: AbletonSendName;
  label: string;
}

const SendControl = ({ trackView, sendName, label }: SendControlProps) => {
  return (
    <DeviceParamSlider
      trackView={trackView}
      height={mixerChannelHalfWidth}
      width={mixerChannelHalfWidth}
      deviceParamName={sendName}
      label={label}
    />
  );
};

export default SendControl;
