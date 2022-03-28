import LinkEnableButton from "./AbletonSessionView/LinkEnableButton";
import TransportPlayButton from "./AbletonSessionView/TransportPlayButton";
import OverlayView from "./OverlayView";

const AbletonSessionView = () => {
  return (
    <OverlayView>
      <div>
        <TransportPlayButton />
        <LinkEnableButton />
      </div>
    </OverlayView>
  );
};

export default AbletonSessionView;
