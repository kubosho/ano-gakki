var Convert = (function () {
    function Convert() {
    }
    Convert.keyToNote = function (key) {
        if (key === '') {
            return;
        }
        if (key.search(/^[cCdDeEfFgGaAbB]/) === -1) {
            throw new Error(key + " is invalid key name.");
        }
        var KEYS = [
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
        var index = (key.indexOf("#") !== -1) ? 2 : 1;
        var keyName = key.substring(0, index).toLowerCase();
        var num = Number(key.substring(index)) + 1;
        var note = KEYS.indexOf(keyName) + 12 * num;
        if (note < 0 || note > 127) {
            throw new Error(key + " is not defined key at MIDI.");
        }
        return note;
    };
    Convert.noteToFreq = function (note) {
        if (typeof note !== "number") {
            throw new Error(note + " is not number.");
        }
        if (note < 0 || note > 127) {
            throw new Error(note + " is invalid MIDI note number.");
        }
        return 440 * Math.pow(Math.pow(2, 1 / 12), note - 69);
    };
    return Convert;
})();
module.exports = Convert;
