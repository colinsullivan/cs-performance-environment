import { PerformanceComponent } from './types';
export const create_performance_component = (id: string, scClassName: string) : PerformanceComponent => {
  return {
    id,
    scClassName,
    controllerMappings: {}
  };
}
