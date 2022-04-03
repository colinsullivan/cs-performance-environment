import { scaleLinear } from "d3-scale";

export const createLinearScale = (
  minIn: number,
  maxIn: number,
  minOut: number,
  maxOut: number,
  clamp = true
) => scaleLinear().domain([minIn, maxIn]).range([minOut, maxOut]).clamp(clamp);

export const clamp = (x: number, min: number, max: number) =>
  Math.min(max, Math.max(min, x));
