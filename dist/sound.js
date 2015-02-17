var Sound = (function () {
    function Sound(context, freqs) {
        this._sounds = [];
        this._ctx = context;
        this._freqs = freqs;
        this.createSounds();
    }
    Object.defineProperty(Sound.prototype, "sounds", {
        get: function () {
            return this._sounds;
        },
        enumerable: true,
        configurable: true
    });
    Sound.prototype.play = function (sound) {
        sound.connect(this._ctx.destination);
        sound.start(0);
    };
    Sound.prototype.stop = function (sound) {
        setTimeout(function () {
            sound.stop(0);
        }, 200);
    };
    Sound.prototype.createSounds = function () {
        var _this = this;
        this._freqs.forEach(function (freq) {
            _this._sounds.push(_this._createSound(freq));
        });
        return this._sounds;
    };
    Sound.prototype.destroySounds = function () {
        this._sounds = [];
    };
    Sound.prototype._createSound = function (freq) {
        if (freq <= 0) {
            return;
        }
        var osc = this._ctx.createOscillator();
        osc.frequency.value = freq;
        return osc;
    };
    return Sound;
})();
module.exports = Sound;
