/*global describe, before, it */
var audio = require("../../src/lib/audio");
var context = require("../../src/lib/context");

// MEMO:
// frequency value reference
// http://www.g200kg.com/jp/docs/tech/notefreq.html
describe("Audio", function() {
  var a = null;

  before(function() {
    a = new audio(context());
  });

  describe("#createSound(freq: number)", function() {
    it("should be frequency value is 880Hz", function() {
      var sound = a.createSound(880);
      assert(sound.frequency.value === 880);
    });

    it("should be frequency value is 12543.853951Hz", function() {
      var sound = a.createSound(12543.853951);
      assert(sound.frequency.value === 12543.853951);
    });

    it("should be sound is undefined (freq argument is zero)", function() {
      var sound = a.createSound(0);
      assert(sound === undefined);
    });
  });

  describe("#connectOutput()", function() {
  });
});
