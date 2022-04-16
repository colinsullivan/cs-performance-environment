import { getMixerViewModel } from "common/selectors";
import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";
import OverlayView from "../OverlayView";
import MixerTrack from "./MixerTrack";

const useStyles = createUseStyles({
  mixer: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    flexWrap: "wrap",
  },
});

const MixerView = () => {
  const { sortedTracks } = useSelector(getMixerViewModel);
  const styles = useStyles();

  return (
    <OverlayView>
      <div className={styles.mixer}>
        {sortedTracks.map((t) => (
          <MixerTrack key={t.name} trackView={t} />
        ))}
      </div>
    </OverlayView>
  );
};

export default MixerView;
