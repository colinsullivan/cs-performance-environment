import { getAbletonTracksOrdered } from "common/selectors";
import {createUseStyles} from "react-jss";
import { useSelector } from "react-redux";
import OverlayView from "../OverlayView";
import MixerTrack from "./MixerTrack";

const useStyles = createUseStyles({
  mixer: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    flexWrap: "wrap",
  }
});

const MixerView = () => {
  const tracks = useSelector(getAbletonTracksOrdered);
  const styles = useStyles();
  return (
    <OverlayView>
      <div className={styles.mixer}>
        {tracks.map(t => <MixerTrack key={t.name} track={t} />)}
      </div>
    </OverlayView>
  );
};

export default MixerView;
