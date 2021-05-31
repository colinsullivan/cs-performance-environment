import { useSelector } from "react-redux";

import { getIsConnected } from "common/selectors";

import "./ConnectionStatus.scss";

const ConnectionStatus = () => {
  const isConnected = useSelector(getIsConnected);
  return (
    <div className="connection-status">
      <label>
        Server:
      </label>
      <div
        className={`connection-status-dot ${isConnected ? "connected" : ""}`}
      ></div>
    </div>
  );
};

export default ConnectionStatus;
