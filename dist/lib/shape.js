var Shape = (function () {
    function Shape(parentSelector) {
        this.snap = Snap(parentSelector);
    }
    Shape.prototype.createLine = function (linePoints) {
        if (linePoints.length !== 4) {
            return;
        }
        return this.snap.line(linePoints[0], linePoints[1], linePoints[2], linePoints[3]);
    };
    Shape.prototype.drawLine = function (line, duration) {
        if (duration === void 0) { duration = 1000; }
        line.attr({
            stroke: "#51917a",
            strokeWidth: 10
        }).animate({
            opacity: 0
        }, duration);
    };
    return Shape;
})();
module.exports = Shape;
