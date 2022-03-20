import "./StatusDot.scss";

const StatusDot = (isConnected: boolean) => (
  <div className={`connection-status-dot ${isConnected ? "connected" : ""}`}>
  </div>
);
export default StatusDot;
