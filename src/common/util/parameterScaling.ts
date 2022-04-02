import { scaleLinear } from "d3-scale";

export const createLinearScale = (
  minIn: number,
  maxIn: number,
  minOut: number,
  maxOut: number,
  clamp = true
) => {
  const scale = scaleLinear()
    .domain([minIn, maxIn])
    .range([minOut, maxOut])
    .clamp(clamp);
  return (x: number) => scale(x);
};
