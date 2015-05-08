var Context = (function () {
    function Context() {
    }
    Context.create = function (destination) {
        if (destination === void 0) { destination = window; }
        var AudioCtx = destination.AudioContext || destination.webkitAudioContext;
        return new AudioCtx();
    };
    return Context;
})();
module.exports = Context;
