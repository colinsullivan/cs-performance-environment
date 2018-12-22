import Color from 'pex-color';

export const darkBlue = 0x112F41;
export const turquoise = 0x068587;
export const turquoiseLight = 0x4FB99F;
export const turquoiseTransparentColor = Color.create(
  0x4F / 255.0,
  0xB9 / 255.0,
  0x9F / 255.0,
  0.5
);
export const yellow = 0xF2B134;
export const orange = 0xED553B;
export const orangeTransparentColor = Color.create(
  0xED / 255.0,
  0x55 / 255.0,
  0x3B / 255.0,
  0.5
);

export function getRGBAString (color) {
  const bytes = Color.getRGBBytes(color);
  return `rgba(${bytes[0]}, ${bytes[1]}, ${bytes[2]}, ${color[3]})`;
}
