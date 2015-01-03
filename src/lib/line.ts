/// <reference path="../../DefinitelyTyped/fabricjs/fabricjs.d.ts" />

class Line {
  static create(coords: number[]): fabric.ILine {
    return new fabric.Line(coords, {
      fill: "#51917a",
      stroke: "#51917a",
      strokeWidth: 10,
      selectable: false
    });
  }
}

export = Line;
