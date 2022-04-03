import { AbletonSendName, AbletonTrack } from "common/models/ableton/api";
import DeviceParamSlider from "./DeviceParamSlider";
import { mixerChannelHalfWidth } from "constants/ui";

interface SendControlProps {
  track: AbletonTrack;
  sendName: AbletonSendName;
  label: string;
}

const SendControl = ({ track, sendName, label }: SendControlProps) => {
  return (
    <DeviceParamSlider
      track={track}
      height={mixerChannelHalfWidth}
      width={mixerChannelHalfWidth}
      deviceParamName={sendName}
      label={label}
    />
  );
};

export default SendControl;
