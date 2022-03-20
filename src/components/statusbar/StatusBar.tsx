import ConnectionStatus from "components/statusbar/ConnectionStatus";
import OctatrackStatus from "components/statusbar/OctatrackStatus";
import CrowStatusDisplay from "./CrowStatusDisplay";

import "./StatusBar.scss";
import TempoDisplay from "./TempoDisplay";

const StatusBar = () => {
  return (
    <div className="status-bar">
      <TempoDisplay />
      <OctatrackStatus />
      <ConnectionStatus />
      <CrowStatusDisplay />
    </div>
  );
};

export default StatusBar;
