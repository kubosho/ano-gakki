/*global describe, before, beforeEach, after, afterEach, it, assert */
var Sound = require("../../lib/sound");

describe("Sound", function() {
  var ctx = new AudioContext();
  var sound = null;
  var sounds = null;

  before(function() {
    var freqs = [587, 659, 784, 880, 988, 784];
    sound = new Sound(ctx, freqs);
    sound.sounds = createOscillatorNodes(ctx, freqs);
  });

  describe("#play", function() {
    it("will return Sound instance", function() {
      var play = sound.play();
      assert.equal(play instanceof Sound, true);
    });
  });

  describe("#stop", function() {
    it("will return Sound instance", function() {
      var stop = sound.stop();
      assert.equal(stop instanceof Sound, true);
    });
  });

  describe("#createOscillatorNodes", function() {
    it("will return OscillatorNode[0].frequency.value equal scores[0]", function() {
      sounds = sound.createOscillatorNodes();
      assert.equal(sounds[0].frequency.value, 587);
    });
  });

  describe("#destroyOscillatorNodes", function() {
    it("will sounds[] is empty", function() {
      sound.destroyOscillatorNodes();
      assert.equal(sound.sounds.length, 0);
    });
  });
});

//////////////////////////////////////////////////

function createOscillatorNodes(ctx, freqs) {
    var oscNodes = [];

    freqs.forEach(function(freq) {
      var osc = ctx.createOscillator();
      osc.frequency.value = freq;
      oscNodes.push(osc);
    });

    return oscNodes;
}
