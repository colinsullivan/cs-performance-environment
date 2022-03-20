import ConnectionStatus from "components/statusbar/ConnectionStatus";
import OctatrackStatus from "components/statusbar/OctatrackStatus";

import "./StatusBar.scss";
import TempoDisplay from "./TempoDisplay";

const StatusBar = () => {
  return (
    <div className="status-bar">
      <TempoDisplay />
      <OctatrackStatus />
      <ConnectionStatus />
    </div>
  );
};

export default StatusBar;
