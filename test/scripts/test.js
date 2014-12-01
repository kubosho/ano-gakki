/*global Sounds, describe, before, it */
var assert = require('../../node_modules/power-assert');
var sounds = require('../../build/sounds').Sounds;

describe("Sounds", function() {
  before(function() {
    sounds = Object.create(sounds.prototype);
  });

  describe("#a()", function() {
    it("should be frequency is 880Hz", function() {
      assert(sounds.a(5) === 880);
    });
  });

  describe("#b()", function() {
    it("should be frequency is 987.8Hz", function() {
      assert(sounds.b(5) === 987.8);
    });
  });

  describe("#d()", function() {
    it("should be frequency is 587.3Hz", function() {
      assert(sounds.d(5) === 587.3);
    });
  });

  describe("#e()", function() {
    it("should be frequency is 659.3Hz", function() {
      assert(sounds.e(5) === 659.3);
    });
  });

  describe("#g()", function() {
    it("should be frequency is 784Hz", function() {
      assert(sounds.g(5) === 784);
    });
  });
});
