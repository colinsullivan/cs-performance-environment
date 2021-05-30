import { NumberMenuOption } from "./api";

export const durOptions: Array<NumberMenuOption> = [
  { value: 8, label: "8" },
  { value: 4, label: "4" },
  { value: 2, label: "2" },
  { value: 1.5, label: "1 1/2" },
  { value: 1, label: "1" },
  { value: 3 / 4, label: "3/4" },
  { value: 1 / 2, label: "1/2" },
  { value: 2 / 3, label: "2/3" },
  { value: 1 / 3, label: "1/3" },
  { value: 1 / 8, label: "1/8" },
  { value: 1 / 16, label: "1/16" },
  { value: 1 / 32, label: "1/32" },
];

export const modSequenceLengthOptions: Array<NumberMenuOption> = new Array(16)
  .fill(0)
  .map((_, i) => ({
    value: i + 1,
    label: (i + 1).toString(),
  }));
