var Shape = (function () {
    function Shape(parentSelector) {
        this.snap = Snap(parentSelector);
    }
    Shape.prototype.drawLine = function (linePoints, duration) {
        if (duration === void 0) { duration = 1000; }
        if (linePoints.length !== 4) {
            return;
        }
        var line = this.snap.line(linePoints[0], linePoints[1], linePoints[2], linePoints[3]);
        line.attr({
            stroke: "#51917a",
            strokeWidth: 10
        }).animate({
            opacity: 0
        }, duration);
        return line;
    };
    Shape.prototype.drawCircle = function (x, y, radius, duration) {
        if (duration === void 0) { duration = 500; }
        var circle = this.snap.circle(x, y, radius);
        circle.attr({
            fill: "transparent",
            stroke: "#51917a",
            strokeWidth: 10,
        }).animate({
            r: window.innerWidth
        }, duration);
        return circle;
    };
    return Shape;
})();
module.exports = Shape;
