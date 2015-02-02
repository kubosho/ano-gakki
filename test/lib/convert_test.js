/*global describe, before, it */
var convert = require("../../src/convert");

describe("convert", function() {
  describe(".getFreq", function() {
    it("should be 'A4' to 440", function() {
      assert.equal(convert.getFreq("A4"), 440);
    });
  });
});
