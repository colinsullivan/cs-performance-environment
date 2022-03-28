import { getAbletonTracks } from "common/selectors";
import React from "react";
import { useSelector } from "react-redux";
import OverlayView from "../OverlayView";
import MixerTrack from "./MixerTrack";

const MixerView = () => {
  const tracks = useSelector(getAbletonTracks);
  return (
    <OverlayView>
      <div>
        {tracks.map(t => <MixerTrack key={t.name} track={t} />)}
      </div>
    </OverlayView>
  );
};

export default MixerView;
