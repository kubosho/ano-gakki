/// <reference path="../../DefinitelyTyped/fabricjs/fabricjs.d.ts" />

export class Line {
  static create(coords: number[]): fabric.ILine {
    return new fabric.Line(coords, {
      fill: "#51917a",
      stroke: "#51917a",
      strokeWidth: 10,
      selectable: false
    });
  }
}

export class Circle {
}

export class Rect {
  static create(): fabric.IRect {
    return new fabric.Rect({
      fill: "transparent",
      stroke: "#51917a",
      strokeWidth: 10,
      width: 100,
      height: 100,
      selectable: false
    });
  }
}
