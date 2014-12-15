/// <reference path="../../DefinitelyTyped/fabricjs/fabricjs.d.ts" />

class Line {
  static create(coords: number[]) {
    return new fabric.Line(coords, {
      fill: "#51917a",
      stroke: "#51917a",
      strokeWidth: 10,
      selectable: false
    });
  }

  static draw(canvas: fabric.IStaticCanvas, coords: number[]): fabric.ILine {
    var line = Line.create(coords);
    canvas.add(line);
    return line;
  }
}

export = Line;
