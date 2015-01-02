class Convert {
  /**!
   * Copyright (c) 2014 Daijiro Wachi <daijiro.wachi@gmail.com>
   * Released under the MIT license
   * https://github.com/watilde/beeplay/blob/master/src/modules/nn.js
   *
   * example:
   * - "A4" | 69
   * - "G9" | 127
   * - "G#9" | "G#9 is not defined key at MIDI."
   */
  static keyToNote(key: string): number {
    if (key === '') {
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
      throw new Error(key + " is not defined key at MIDI.");
    }

    return note;
  }

  /* ref:
   * - http://mohayonao.hatenablog.com/entry/2012/05/25/215159
   * - http://www.g200kg.com/jp/docs/tech/notefreq.html
   *
   * example: 69 | 440
   */
  static noteToFreq(note: number): number {
    if (typeof note !== "number") {
      throw new Error(note + " is not number.");
    }

    if (note < 0 || note > 127) {
      throw new Error(note + " is invalid MIDI note number.");
    }

    return 440 * Math.pow(Math.pow(2, 1/12), note - 69);
  }
}

export = Convert;
