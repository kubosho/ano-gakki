/// <reference path="../../typings/bundle.d.ts" />

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

    public drawLine(linePoints: number[], duration: number = 1000): Snap.Element {
        if (linePoints.length !== 4) {
            return;
        }

        var line = this._snap.line(linePoints[0], linePoints[1], linePoints[2], linePoints[3]);
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

    public drawCircle(x: number, y: number, radius: number, duration: number = 750): Snap.Element {
        var circle = this._snap.circle(x, y, radius);
        circle.attr({
            fill: "transparent",
            stroke: "#51917a",
            strokeWidth: 10
        })
        .animate({
            r: this._windowSize.x
        }, duration, null, () => {
            circle.remove();
        });

        return circle;
    }

    public drawRect(x: number, y: number, size: number = 100, duration: number = 750): Snap.Element {
        var rect = this._snap.rect(x, y, size, size);
        rect.attr({
            fill: "transparent",
            stroke: "#51917a",
            strokeWidth: 10
        });

        this._animationRect(x, y, rect, duration);

        return rect;
    }

    private _animationRect(x: number, y: number, rect: Snap.Element, duration: number): void {
        rect.animate({
            transform: `r180,${x + 50},${y + 50} s${this._windowSize.x / (x / 2)},s${this._windowSize.y / (y / 2)}`
        }, duration, null,
        () => rect.remove());
    }
}

export = Shape;
