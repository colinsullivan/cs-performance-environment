import PexColor from "pex-color";
import { createMuiTheme } from "@material-ui/core/styles";

export const offWhiteColor = PexColor.create(200, 200, 200, 1.0);
export const offDarkColor = PexColor.fromRGBBytes([40, 44, 48, 255]);
export const midToneColor = PexColor.fromRGBBytes([59, 66, 71, 255]);

export const turquoise = 0x068587;
export const turquoiseLightColor = PexColor.fromRGBBytes([161, 203, 196, 255]);
export const turquoiseLightHalf = "rgba(161, 203, 196, 0.5)";
export const turquoiseLightFull = "rgba(161, 203, 196, 1.0)";
export const turquoiseLightTen = "rgba(161, 203, 196, 0.1)";
export const turquoiseTransparentColor = PexColor.create(
  turquoiseLightColor[0],
  turquoiseLightColor[1],
  turquoiseLightColor[2],
  0.5
);
export const accentColor = PexColor.fromRGBBytes([18, 130, 35, 255]);
export const orange = 0xed553b;
export const orangeColor = PexColor.fromRGBBytes([207, 115, 18]);
export const orangeTransparentColor = PexColor.create(
  orangeColor[0],
  orangeColor[1],
  orangeColor[2],
  0.5
);

export function getRGBAString(color) {
  const bytes = PexColor.getRGBBytes(color);
  return `rgba(${bytes[0]}, ${bytes[1]}, ${bytes[2]}, ${color[3]})`;
}

export function asHexNumber(color) {
  var c = [color[0], color[1], color[2]].map(function (val) {
    return Math.floor(val * 255);
  });
  return c[2] | (c[1] << 8) | (c[0] << 16) | (1 << 24);
}

export const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: PexColor.getHex(turquoiseLightColor),
    },
    secondary: {
      main: PexColor.getHex(accentColor),
    },
    error: {
      main: PexColor.getHex(orangeColor),
    },
  },
  typography: {
    useNextVariants: true,
  },
});

export const defaultSelectedColor = "green";
export const defaultActiveColor = "pink";
export const defaultNoteNumberColor = "white";
export const defaultInvalidColor = "red";
export const whiteKeyOutOfScaleColor = "rgba(255, 140, 140, 0.4)";
export const blackKeyOutOfScaleColor = "rgba(200, 0, 0, 0.4)";
