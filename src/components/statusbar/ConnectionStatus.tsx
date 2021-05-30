import { useSelector } from "react-redux";

import { getIsConnected } from "common/selectors";

import "./ConnectionStatus.scss";

const ConnectionStatus = () => {
  const isConnected = useSelector(getIsConnected);
  return (
    <div className="connection-status">
      <div>
        <p className={`connection-text ${isConnected ? "connected" : ""}`}>
          {isConnected ? "Connected!" : "Connecting..."}
        </p>
      </div>
      <div>
        <span
          className={`connection-status-dot ${isConnected ? "connected" : ""}`}
        ></span>
      </div>
    </div>
  );
};

export default ConnectionStatus;
