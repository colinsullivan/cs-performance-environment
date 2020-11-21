export type PerformanceComponent = {
  id: string,
  scClassName: string,
  controllerMappings: object
};

export const create_performance_component = (id: string, scClassName: string) : PerformanceComponent => {
  return {
    id,
    scClassName,
    controllerMappings: {}
  };
}
