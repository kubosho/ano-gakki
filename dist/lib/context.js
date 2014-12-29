function Context() {
    var Ctx = AudioContext || webkitAudioContext;
    return new Ctx();
}
module.exports = Context;
