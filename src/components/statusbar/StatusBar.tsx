import ConnectionStatus from "components/statusbar/ConnectionStatus";
import OctatrackStatus from "components/statusbar/OctatrackStatus";

import "./StatusBar.scss";

const StatusBar = () => {
  return (
    <div className="status-bar">
      <OctatrackStatus />
      <ConnectionStatus />
    </div>
  );
};

export default StatusBar;
