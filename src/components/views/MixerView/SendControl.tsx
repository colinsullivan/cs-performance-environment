import { AbletonSendName, AbletonTrack } from "common/models/ableton/api";
import DeviceParamSlider from "./DeviceParamSlider";
import { MIXER_COLUMN_WIDTH } from "constants/ui";

interface SendControlProps {
  track: AbletonTrack;
  sendName: AbletonSendName;
  label: string;
}

const SendControl = ({ track, sendName, label }: SendControlProps) => {
  return (
    <DeviceParamSlider
      track={track}
      height={MIXER_COLUMN_WIDTH}
      width={MIXER_COLUMN_WIDTH}
      deviceParamName={sendName}
      label={label}
    />
  );
};

export default SendControl;
