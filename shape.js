var Shape = (function () {
    function Shape(parentSelector, windowSize) {
        if (windowSize === undefined) {
            this._windowSize = {
                x: window.innerWidth,
                y: window.innerHeight
            };
        }
        this._snap = Snap(parentSelector);
    }
    Shape.prototype.drawLine = function (linePoints, basePointX, basePointY, angle, duration) {
        if (duration === void 0) { duration = 750; }
        if (linePoints.length !== 4) {
            return;
        }
        var line = this._snap.line(linePoints[0], linePoints[1], linePoints[2], linePoints[3]);
        line.attr({
            stroke: "#51917a",
            strokeWidth: 10
        });
        this._animationLine(line, basePointX, basePointY, angle, duration);
        return line;
    };
    Shape.prototype.drawCircle = function (x, y, radius, duration) {
        if (duration === void 0) { duration = 750; }
        var circle = this._snap.circle(x, y, radius);
        circle.attr({
            fill: "transparent",
            stroke: "#51917a",
            strokeWidth: 10
        });
        this._animationCircle(circle, duration);
        return circle;
    };
    Shape.prototype.drawRect = function (x, y, size, duration) {
        if (size === void 0) { size = 100; }
        if (duration === void 0) { duration = 750; }
        var rect = this._snap.rect(x, y, size, size);
        rect.attr({
            fill: "transparent",
            stroke: "#51917a",
            strokeWidth: 10
        });
        this._animationRect(rect, x, y, duration);
        return rect;
    };
    Shape.prototype.drawTriangle = function (x, y, duration) {
        if (duration === void 0) { duration = 750; }
        var triangle = this._snap.polygon([x - 70, y + 30, x + 70, y + 30, x, y - 80]);
        triangle.attr({
            fill: "transparent",
            stroke: "#51917a",
            strokeWidth: 10
        });
        this._animationTriangle(triangle, x, y, duration);
        return triangle;
    };
    Shape.prototype._animationLine = function (line, basePointX, basePointY, angle, duration) {
        line.transform("r" + angle + ", " + basePointX + ", " + basePointY).animate({
            opacity: 0
        }, duration, null, function () { return line.remove(); });
    };
    Shape.prototype._animationCircle = function (circle, duration) {
        circle.animate({
            r: this._windowSize.x
        }, duration, null, function () { return circle.remove(); });
    };
    Shape.prototype._animationRect = function (rect, x, y, duration) {
        rect.animate({
            transform: "r180," + (x + 50) + "," + (y + 50) + " s" + this._windowSize.x / 28 + "," + this._windowSize.y / 28
        }, duration, null, function () { return rect.remove(); });
    };
    Shape.prototype._animationTriangle = function (triangle, x, y, duration) {
        triangle.animate({
            transform: "s" + this._windowSize.x / 28 + "," + this._windowSize.y / 28
        }, duration, null, function () { return triangle.remove(); });
    };
    return Shape;
})();
module.exports = Shape;
