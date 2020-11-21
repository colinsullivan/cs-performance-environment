interface ControllerMappingElements {
  [elementName: string]: string
}
interface ControllerMapping {
  [controllerName: string]: ControllerMappingElements
};

export type PerformanceComponent = {
  id: string,
  scClassName: string,
  controllerMappings: ControllerMapping
};

export const create_performance_component = (id: string, scClassName: string) : PerformanceComponent => {
  return {
    id,
    scClassName,
    controllerMappings: {}
  };
}
