import { useSelector } from "react-redux";

import { getIsConnected } from "common/selectors";

import "./ConnectionStatus.scss";
import StatusDot from "./StatusDot";

const ConnectionStatus = () => {
  const isConnected = useSelector(getIsConnected);
  return (
    <div className="connection-status">
      <label>
        Server:
      </label>
      <StatusDot isConnected={isConnected} />
    </div>
  );
};

export default ConnectionStatus;
