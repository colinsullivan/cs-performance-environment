import ConnectionStatus from "components/statusbar/ConnectionStatus";

import "./StatusBar.scss";

const StatusBar = () => {
  return (
    <div className="status-bar">
      <ConnectionStatus />
    </div>
  );
};

export default StatusBar;
