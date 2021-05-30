import React, { FunctionComponent } from "react";
import styled from "styled-components";

interface OverlayViewProps {
  children: React.ReactElement;
}

const OverlayViewContainer = styled.div`
  position: relative;
  top: 0;
  left: 0;
`;

const OverlayView: FunctionComponent<OverlayViewProps> = ({ children }) => (
  <OverlayViewContainer>
    <div className="container-fluid">{children}</div>
  </OverlayViewContainer>
);

export default OverlayView;
