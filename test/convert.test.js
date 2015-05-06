/*global describe, before, beforeEach, after, afterEach, it, assert */
var convert = require("../../src/convert");

describe("Convert", function() {
  describe(".getFreq", function() {
    it("will return 'A4' to 440", function() {
      assert.equal(convert.getFreq("A4"), 440);
    });
  });

  describe(".scoresToFreqs", function() {
    it("will return ['A4', 'A5'] to [440, 880]", function() {
      var freqs = convert.scoresToFreqs(["A4", "A5"]);
      assert.equal(freqs[0], 440);
      assert.equal(freqs[1], 880);
    });
  });
});
