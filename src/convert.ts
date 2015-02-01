class Convert {
    // example:
    // - "A4" | 440
    public static getFreq(pitch: string): number {
        return this._noteToFreq(this._keyToNote(pitch));
    }

    // copyright (c) 2014 Daijiro Wachi <daijiro.wachi@gmail.com>
    // released under the MIT license
    // https://github.com/watilde/beeplay/blob/master/src/modules/nn.js
    //
    // example:
    // - "A4"  | 69
    // - "G#9" | "128 is not defined key at MIDI."
    private static _keyToNote(key: string): number {
        if (key === "") {
            return;
        }

        if (key.search(/^[cdefgabCDEFGAB]/) === -1) {
            throw new Error(key + " is invalid key name.");
        }

        var KEYS = [
        "c", "c#",
        "d", "d#",
        "e",
        "f", "f#",
        "g", "g#",
        "a", "a#",
        "b"
        ];
        var index = (key.indexOf("#") !== -1) ? 2 : 1;
        var keyName = key.substring(0, index).toLowerCase();
        var num = Number(key.substring(index)) + 1;
        var note = KEYS.indexOf(keyName) + 12 * num;

        if (note < 0 || note > 127) {
            throw new Error("'" + note + "'" + " is not defined key at MIDI.");
        }

        return note;
    }

    // ref:
    // example: 69 | 440
    private static _noteToFreq(note: number): number {
        if (typeof note !== "number") {
            throw new Error(note + " is not number.");
        }

        if (note < 0 || note > 127) {
            throw new Error(note + " is not defined key at MIDI.");
        }

        return 440 * Math.pow(Math.pow(2, (1 / 12)), note - 69);
    }
}

export = Convert;
