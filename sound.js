var Sound = (function () {
    function Sound(context, freqs) {
        this._sounds = [];
        this._currentSound = 0;
        this._ctx = context;
        this._freqs = freqs;
    }
    Object.defineProperty(Sound.prototype, "sounds", {
        get: function () {
            return this._sounds;
        },
        set: function (oscillatorNodes) {
            this._sounds = oscillatorNodes;
        },
        enumerable: true,
        configurable: true
    });
    Sound.prototype.play = function (when) {
        if (when === void 0) { when = 0; }
        if (this._currentSound === this._sounds.length) {
            this._currentSound = 0;
            this.destroyOscillatorNodes();
            this._sounds = this.createOscillatorNodes();
        }
        var sound = this._sounds[this._currentSound];
        sound.connect(this._ctx.destination);
        sound.start(when);
        return this;
    };
    Sound.prototype.stop = function (when) {
        if (when === void 0) { when = 0; }
        var sound = this._sounds[this._currentSound];
        this._currentSound++;
        setTimeout(function () {
            sound.stop(0);
        }, when);
        return this;
    };
    Sound.prototype.createOscillatorNodes = function () {
        var _this = this;
        this._freqs.forEach(function (freq) {
            _this._sounds.push(_this._createSound(freq));
        });
        return this._sounds;
    };
    Sound.prototype.destroyOscillatorNodes = function () {
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
