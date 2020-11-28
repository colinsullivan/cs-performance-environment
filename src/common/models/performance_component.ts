import { v4 as uuidv4 } from "uuid";

import {
  PerformanceComponent,
  OctatrackState,
  PerformanceComponentPreset,
  PresetProps,
} from "./types";
import { getPatternValue } from "common/models/octatrack";

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
  props: PresetProps
): PerformanceComponentPreset => ({
  id: uuidv4(),
  octatrackPatternValue: getPatternValue(octatrackState),
  props,
});
