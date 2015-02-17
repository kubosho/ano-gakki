var Context = (function () {
    function Context() {
    }
    Context.create = function () {
        var AudioCtx = AudioContext || webkitAudioContext;
        return new AudioCtx();
    };
    return Context;
})();
module.exports = Context;
