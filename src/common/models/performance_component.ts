import { v4 as uuidv4 } from "uuid";

import {
  PerformanceComponent,
  OctatrackState,
  PerformanceComponentPreset,
} from "./types";

export const create_performance_component = (
  id: string,
  scClassName: string
): PerformanceComponent => {
  return {
    id,
    scClassName,
    controllerMappings: {},
  };
};

export const create_preset = (
  octatrackState: OctatrackState,
  props: { [propName: string]: any },
  followOctatrackPattern = false
): PerformanceComponentPreset => ({
  id: uuidv4(),
  octatrackPatternValue: octatrackState.currentPatternProgramChangeValue,
  followOctatrackPattern,
  props,
});
