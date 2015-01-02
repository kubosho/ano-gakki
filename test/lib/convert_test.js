/*global describe, before, it */
var convert = require("../../src/lib/convert");

describe("Convert", function() {
  describe("#keyToNote(key: string)", function() {
    it("should be return 69", function() {
      assert(convert.keyToNote("A4") === 69);
    });

    it("should be return undefined (argument is '').", function() {
      assert(convert.keyToNote("") === undefined);
    });

    it("should be throw error (argument is 'H3').", function() {
      assert.throws(function() {
        convert.keyToNote("H3");
      }, Error);
    });

    it("should be throw error (argument is {}').", function() {
      assert.throws(function() {
        convert.keyToNote({});
      }, Error);
    });

    it("should be throw error (argument is 'G#9').", function() {
      assert.throws(function() {
        convert.keyToNote("G#9");
      }, Error);
    });
  });

  describe("#noteToFreq(note: number)", function() {
    it("should be return 440", function() {
      assert(convert.noteToFreq(69) === 440);
    });

    it("should be throw error (argument is '')", function() {
      assert.throws(function() {
        convert.noteToFreq("");
      }, Error);
    });

    it("should be throw error (argument is -1).", function() {
      assert.throws(function() {
        convert.noteToFreq(-1);
      }, Error);
    });
  });
});
