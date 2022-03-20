import { getCrowDeviceReadyStates } from "common/selectors";
import { useSelector } from "react-redux";
import StatusDot from "./StatusDot";

const CrowStatusDisplay = () => {
  const crowReadyStates = useSelector(getCrowDeviceReadyStates);
  return (
    <div>
      <label>Crow:</label>
      {crowReadyStates.map((crowReadyInfo) => (
        <StatusDot isConnected={crowReadyInfo.isReady} key={crowReadyInfo.name} />
      ))}
    </div>
  );
};

export default CrowStatusDisplay;
