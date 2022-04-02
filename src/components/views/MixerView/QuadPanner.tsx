import { createUseStyles } from "react-jss";

import { AbletonTrack } from "common/models/ableton/api";
import { mixerChannelWidth, mixerChannelMargin } from "constants/ui";
import { transparentBackgroundTouchControl } from "components/styles";
import { turquoiseLightFull } from "constants/colors";
import { useSelector } from "react-redux";
import { getMixerConfiguration } from "common/selectors";

interface QuadPannerProps {
  track: AbletonTrack;
}

const dotSize = 12;
const height = mixerChannelWidth - mixerChannelMargin;
const useStyles = createUseStyles({
  panner: {
    ...transparentBackgroundTouchControl,
    width: mixerChannelWidth - mixerChannelMargin,
    height,
    marginBottom: mixerChannelMargin,
    position: "relative",
  },
  pannerPositionDot: {
    background: turquoiseLightFull,
    height: dotSize,
    width: dotSize,
    clipPath: "circle()",
    shapeOutside: "circle()",
    position: "absolute",

    left: 0.5 * mixerChannelWidth,
    bottom: 0.5 * mixerChannelWidth,
  },
});

const QuadPanner = (props: QuadPannerProps) => {
  const { pannerSends } = useSelector(getMixerConfiguration);
  const styles = useStyles();

  const { track } = props;

  const frontDeviceParam = track[pannerSends.frontSendName];
  const rearDeviceParam = track[pannerSends.rearSendName];

  return (
    <div className={styles.panner}>
      <div className={styles.pannerPositionDot}></div>
    </div>
  );
};

export default QuadPanner;
