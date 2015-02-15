/// <reference path="../typings/snapsvg/snapsvg.d.ts" />

class Shape {
    snap: Snap.Paper;

    constructor(parentSelector: string) {
        this.snap = Snap(parentSelector);
    }

    createLine(linePoints: number[]): Snap.Element {
        if (linePoints.length !== 4) {
            return;
        }
        return this.snap.line(linePoints[0],
                              linePoints[1],
                              linePoints[2],
                              linePoints[3]);
    }

    drawLine(line: Snap.Element, duration = 1000): void {
        line
            .attr({
                stroke: "#51917a",
                strokeWidth: 10
            })
            .animate({
                opacity: 0
            }, duration)
    }
}

export = Shape;
