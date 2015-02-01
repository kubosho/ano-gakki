class Convert {
    private static KEYS: string[] = [
        "c", "c#",
        "d", "d#",
        "e",
        "f", "f#",
        "g", "g#",
        "a", "a#",
        "b"
    ];

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

        var index = (key.indexOf("#") !== -1) ? 2 : 1;
        var keyName = key.substring(0, index).toLowerCase();
        var num = Number(key.substring(index)) + 1;
        var note = this.KEYS.indexOf(keyName) + 12 * num;

        this._isMIDIKey(note);

        return note;
    }

    // ref:
    // example: 69 | 440
    private static _noteToFreq(note: number): number {
        if (typeof note !== "number") {
            throw new Error(note + " is not number.");
        }

        this._isMIDIKey(note);

        return 440 * Math.pow(Math.pow(2, (1 / 12)), note - 69);
    }

    private static _isMIDIKey(note: number): void {
        if (note < 0 || note > 127) {
            throw new Error(note + " is not defined key at MIDI.");
        }
    }
}

export = Convert;
