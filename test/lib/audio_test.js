/*global describe, before, it */
var audio = require("../../src/lib/audio");
var context = require("../../src/lib/context");

// MEMO:
// frequency value reference
// http://www.g200kg.com/jp/docs/tech/notefreq.html
describe("Audio", function() {
  var ctx = context();
  var anoGakkiAudio = null;

  before(function() {
    anoGakkiAudio = new audio(ctx);
  });

  describe("#createSound(freq: number)", function() {
    it("should be frequency value is 880Hz", function() {
      var sound = anoGakkiAudio.createSound(880);
      assert(sound.frequency.value === 880);
    });

    it("should be frequency value is 12543.853951Hz", function() {
      var sound = anoGakkiAudio.createSound(12543.853951);
      assert(sound.frequency.value === 12543.853951);
    });

    it("should be sound is undefined (argument is 0)", function() {
      var sound = anoGakkiAudio.createSound(0);
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
        anoGakkiAudio.connectOutput(sound);
      }, /not defined/);
    });

    it("argument is 'foo', should be throw error.", function() {
      assert.throws(function() {
        anoGakkiAudio.connectOutput("foo");
      }, Error);
    });

    it("argument is {}, should be throw error.", function() {
      assert.throws(function() {
        anoGakkiAudio.connectOutput({});
      }, Error);
    });
  });
});
