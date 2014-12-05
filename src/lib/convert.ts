class Convert {
  static baseMIDINum = 69;

  // ref:
  // - https://github.com/watilde/beeplay/blob/master/src/modules/nn.js
  static keyToNote(name: string): number {
    var KEYS = [
      "c", "c#",
      "d", "d#",
      "e",
      "f", "f#",
      "g", "g#",
      "a", "a#",
      "b"
    ];
    var index = (name.indexOf("#") !== -1) ? 2 : 1;
    var note = name.substring(0, index).toLowerCase();
    var number = Number(name.substring(index)) + 1;
    return KEYS.indexOf(note) + 12 * number;
  }

  // ref:
  // - http://mohayonao.hatenablog.com/entry/2012/05/25/215159
  // - http://www.g200kg.com/jp/docs/tech/notefreq.html
  static noteToFreq(num: number): number {
    return 440 * Math.pow(Math.pow(2, 1/12), num - this.baseMIDINum);
  }
}

export = Convert;
