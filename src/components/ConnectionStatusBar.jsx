import React from "react";
import { connect } from "react-redux";

import { getIsConnected } from "common/selectors";

import "./ConnectionStatusBar.scss";

const ConnectionStatusBar = ({ isConnected }) => {
  return (
    <div className="connection-status-bar">
      <div>
        <p className={`connection-text ${isConnected ? "connected" : ""}`}>
          {isConnected ? "Connected!" : "Connecting..."}
        </p>
      </div>
      <div>
        <span className={`connection-status-dot ${isConnected ? "connected" : ""}`}></span>
      </div>
    </div>
  );
};

export default connect((state) => ({
  isConnected: getIsConnected(state),
}))(ConnectionStatusBar);