import CSS from "csstype";

import { turquoiseLightHalf } from "constants/colors";

export const touchControlBorderWidth = 1;
export const transparentBackgroundTouchControl: CSS.Properties = {
  background: "transparent",
  border: `${touchControlBorderWidth}px solid ${turquoiseLightHalf}`,
};
