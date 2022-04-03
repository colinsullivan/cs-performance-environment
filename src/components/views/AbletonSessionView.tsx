import {createUseStyles} from "react-jss";
import LinkEnableButton from "./AbletonSessionView/LinkEnableButton";
import TempoControl from "./AbletonSessionView/TempoControl";
import TransportPlayButton from "./AbletonSessionView/TransportPlayButton";
import OverlayView from "./OverlayView";

const useStyles = createUseStyles({
  sessionView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "middle"
  }
});

const AbletonSessionView = () => {
  const styles = useStyles();
  return (
    <OverlayView>
      <div className={styles.sessionView}>
        <TransportPlayButton />
        <LinkEnableButton />
        <TempoControl />
      </div>
    </OverlayView>
  );
};

export default AbletonSessionView;
