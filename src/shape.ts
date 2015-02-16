/// <reference path="../typings/snapsvg/snapsvg.d.ts" />

class Shape {
    snap: Snap.Paper;

    constructor(parentSelector: string) {
        this.snap = Snap(parentSelector);
    }

    public drawLine(linePoints: number[], duration = 1000): Snap.Element {
        if (linePoints.length !== 4) {
            return;
        }

        var line = this.snap.line(linePoints[0], linePoints[1], linePoints[2], linePoints[3]);
        line.attr({
            stroke: "#51917a",
            strokeWidth: 10
        })
        .animate({
            opacity: 0
        }, duration, null, () => {
            line.remove();
        });

        return line;
    }

    public drawCircle(x: number, y: number, radius: number, duration = 750): Snap.Element {
        var circle = this.snap.circle(x, y, radius);
        circle.attr({
            fill: "transparent",
            stroke: "#51917a",
            strokeWidth: 10,
        })
        .animate({
            r: window.innerWidth
        }, duration, null, () => {
            circle.remove();
        });

        return circle;
    }
}

export = Shape;
