/// <reference path="../typings/bundle.d.ts" />

class Shape {
    private _snap: Snap.Paper;
    private _windowSize: WindowSize;

    constructor(parentSelector: string, windowSize?: WindowSize) {
        if (windowSize === undefined) {
            this._windowSize = {
                x: window.innerWidth,
                y: window.innerHeight
            };
        }
        this._snap = Snap(parentSelector);
    }

    public drawLine(linePoints: number[], duration: number = 750): Snap.Element {
        if (linePoints.length !== 4) {
            return;
        }

        var line = this._snap.line(linePoints[0], linePoints[1], linePoints[2], linePoints[3]);
        line.attr({
            stroke: "#51917a",
            strokeWidth: 10
        });

        this._animationLine(line, duration);

        return line;
    }

    public drawCircle(x: number, y: number, radius: number, duration: number = 750): Snap.Element {
        var circle = this._snap.circle(x, y, radius);
        circle.attr({
            fill: "transparent",
            stroke: "#51917a",
            strokeWidth: 10
        });

        this._animationCircle(circle, duration);

        return circle;
    }

    public drawRect(x: number, y: number, size: number = 100, duration: number = 750): Snap.Element {
        var rect = this._snap.rect(x, y, size, size);
        rect.attr({
            fill: "transparent",
            stroke: "#51917a",
            strokeWidth: 10
        });

        this._animationRect(rect, x, y, duration);

        return rect;
    }

    public drawTriangle(x: number, y: number, duration: number = 750): Snap.Element {
        var triangle = this._snap.polygon([x - 70,y + 30, x + 70,y + 30, x,y - 80]);
        triangle.attr({
            fill: "transparent",
            stroke: "#51917a",
            strokeWidth: 10
        });

        this._animationTriangle(triangle, x, y, duration);

        return triangle;
    }

    //////////////////////////////////////////////////

    private _animationLine(line: Snap.Element, duration: number): void {
        line.animate({
            opacity: 0
        }, duration, null,
        () => line.remove());
    }

    private _animationCircle(circle: Snap.Element, duration: number): void {
        circle.animate({
            r: this._windowSize.x
        }, duration, null,
        () => circle.remove());
    }

    private _animationRect(rect: Snap.Element, x: number, y: number, duration: number): void {
        rect.animate({
            transform: `r180,${x + 50},${y + 50} s${this._windowSize.x / 28},${this._windowSize.y / 28}`
        }, duration, null,
        () => rect.remove());
    }

    private _animationTriangle(triangle: Snap.Element, x: number, y: number, duration: number): void {
        triangle.animate({
            transform: `s${this._windowSize.x / 28},${this._windowSize.y / 28}`
        }, duration, null,
        () => triangle.remove());
    }
}

export = Shape;
