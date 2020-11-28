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
  octatrackPatternValue: octatrackState.currentPatternProgramChangeValue,
  followOctatrackPattern,
  props,
});
