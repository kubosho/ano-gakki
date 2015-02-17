var Convert = (function () {
    function Convert() {
    }
    Convert.getFreq = function (pitch) {
        return this._noteToFreq(this._keyToNote(pitch));
    };
    Convert._keyToNote = function (key) {
        if (key === "") {
            return;
        }
        if (key.search(/^[cdefgabCDEFGAB]/) === -1) {
            throw new Error(key + " is invalid key name.");
        }
        var index = (key.indexOf("#") !== -1) ? 2 : 1;
        var keyName = key.substring(0, index).toLowerCase();
        var num = Number(key.substring(index)) + 1;
        var note = this.KEYS.indexOf(keyName) + 12 * num;
        this._isMIDIKey(note);
        return note;
    };
    Convert._noteToFreq = function (note) {
        if (typeof note !== "number") {
            throw new Error(note + " is not number.");
        }
        this._isMIDIKey(note);
        return 440 * Math.pow(Math.pow(2, (1 / 12)), note - 69);
    };
    Convert._isMIDIKey = function (note) {
        if (note < 0 || note > 127) {
            throw new Error(note + " is not defined key at MIDI.");
        }
    };
    Convert.KEYS = [
        "c",
        "c#",
        "d",
        "d#",
        "e",
        "f",
        "f#",
        "g",
        "g#",
        "a",
        "a#",
        "b"
    ];
    return Convert;
})();
module.exports = Convert;
