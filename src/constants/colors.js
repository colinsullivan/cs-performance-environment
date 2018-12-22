import Color from 'pex-color';
import { createMuiTheme  } from '@material-ui/core/styles';

export const offWhiteColor = Color.create(200, 200, 200, 1.0);

export const offDarkColor = Color.fromRGBBytes([40, 44, 48, 255]);
export const midToneColor = Color.fromRGBBytes([59, 66, 71, 255]);

export const turquoise = 0x068587;
export const turquoiseLightColor = Color.fromRGBBytes([161, 203, 196, 255]);
export const turquoiseTransparentColor = Color.create(
  turquoiseLightColor[0],
  turquoiseLightColor[1],
  turquoiseLightColor[2],
  0.5
);
export const accentColor = Color.fromRGBBytes([18, 130, 35, 255]);
export const orange = 0xED553B;
export const orangeColor = Color.fromRGBBytes([207, 115, 18]);
export const orangeTransparentColor = Color.create(
  orangeColor[0],
  orangeColor[1],
  orangeColor[2],
  0.5
);


export function getRGBAString (color) {
  const bytes = Color.getRGBBytes(color);
  return `rgba(${bytes[0]}, ${bytes[1]}, ${bytes[2]}, ${color[3]})`;
}

export function asHexNumber (color) {
  var c = [ color[0], color[1], color[2] ].map(function(val) {
    return Math.floor(val * 255);
  });
  return (c[2] | (c[1] << 8) | (c[0] << 16)) | (1 << 24);
}

export const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: Color.getHex(turquoiseLightColor)
    },
    secondary: {
      main: Color.getHex(accentColor)
    },
    error: {
      main: Color.getHex(orangeColor)
    }
  },
  typography: {
    useNextVariants: true,
  },
});
