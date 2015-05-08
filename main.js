var Data = require("./data");
var Shape = require("./shape");
var Sound = require("./sound");
var context = require("./context");
var Main = (function () {
    function Main() {
        var _this = this;
        this._ctx = context.create();
        this._data = new Data();
        this._sound = new Sound(this._ctx, this._data.freqs);
        this._windowSize = { x: 0, y: 0 };
        this._currentShape = 0;
        this._windowSize = {
            x: window.innerWidth,
            y: window.innerHeight
        };
        this._sound.createOscillatorNodes();
        this._shape = new Shape("#shape");
        Main._eventTypes.forEach(function (type) {
            document.addEventListener(Main._events.start[type], _this, false);
        });
    }
    Main.prototype.handleEvent = function (evt) {
        switch (evt.type) {
            case Main._events.start.touch:
                this._touchStart(evt, "touch");
                break;
            case Main._events.start.mouse:
                this._touchStart(evt, "mouse");
                break;
        }
    };
    Main.prototype._touchStart = function (evt, evtType) {
        var _this = this;
        if (evtType === "mouse") {
            evt.preventDefault();
        }
        var pageX = evt.pageX;
        var pageY = evt.pageY;
        if (this._currentShape === this._data.freqs.length) {
            this._currentShape = 0;
        }
        var angles = this._data.lineAngle;
        var line = function () { return _this._shape.drawLine([-_this._windowSize.x * 3, pageY, _this._windowSize.x * 3, pageY], pageX, pageY, angles[_this._currentShape]); };
        var circle = function () { return _this._shape.drawCircle(pageX, pageY, 10); };
        var rectSize = 100;
        var rect = function () { return _this._shape.drawRect(pageX - (rectSize / 2), pageY - (rectSize / 2), rectSize); };
        var triangle = function () { return _this._shape.drawTriangle(pageX, pageY); };
        this._sound.play(0).stop(200);
        _.sample([line, circle, rect, triangle])();
        this._currentShape++;
    };
    Main._eventTypes = ["touch", "mouse"];
    Main._events = {
        start: {
            touch: "touchstart",
            mouse: "mousedown"
        }
    };
    return Main;
})();
document.addEventListener("DOMContentLoaded", function () { return new Main(); }, false);
