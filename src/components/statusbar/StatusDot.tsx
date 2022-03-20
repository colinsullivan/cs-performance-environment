import "./StatusDot.scss";

interface StatusDotProps {
  isConnected: boolean;
  label?: string;
}

const StatusDot = ({isConnected, label=""}: StatusDotProps) => (
  <div className={`connection-status-dot ${isConnected ? "connected" : ""}`}>
  </div>
);
export default StatusDot;
