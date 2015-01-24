/*global describe, before, it */
var Audio = require("../../src/lib/audio");
var context = require("../../src/lib/context").create;

// MEMO:
// frequency value reference
// http://www.g200kg.com/jp/docs/tech/notefreq.html
describe("Audio", function() {
  var ctx = context();
  var audio = null;

  before(function() {
    audio = new Audio(ctx);
  });

  describe("#createSound(freq: number)", function() {
    it("should be frequency value is 880Hz", function() {
      var sound = audio.createSound(880);
      assert(sound.frequency.value === 880);
    });

    it("should be frequency value is 12543.853951Hz", function() {
      var sound = audio.createSound(12543.853951);
      assert(sound.frequency.value === 12543.853951);
    });

    it("should be sound is undefined (argument is 0)", function() {
      var sound = audio.createSound(0);
      assert(sound === undefined);
    });
  });

  describe("#connectOutput(audio: AudioNode)", function() {
    var sound = null;

    before(function() {
      sound = ctx.createOscillator();
    });

    it("should be working", function() {
      assert.doesNotThrow(function() {
        audio.connectOutput(sound);
      }, /not defined/);
    });

    it("should be throw error (argument is 'foo')", function() {
      assert.throws(function() {
        audio.connectOutput("foo");
      }, Error);
    });

    it("should be throw error (argument is {})", function() {
      assert.throws(function() {
        audio.connectOutput({});
      }, Error);
    });
  });
});
