export interface MenuDimensions {
  width: number;
  height: number;
}

export interface MenuDistance {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface MenuPoint {
  x: number;
  y: number;
}

export interface AutoLayoutMeasurements {
  anchorSize: MenuDimensions;
  bodySize: MenuDimensions;
  surfaceSize: MenuDimensions;
  viewportDistance: MenuDistance;
  viewportSize: MenuDimensions;
  windowScroll: MenuPoint;
}
