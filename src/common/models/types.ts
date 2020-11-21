export interface ControllerMappingElements {
  [elementName: string]: string
}
export interface ControllerMapping {
  [controllerName: string]: ControllerMappingElements
};
export type PerformanceComponent = {
  id: string,
  scClassName: string,
  controllerMappings: ControllerMapping
};

