/*global describe, before, it */
var audio = require('../../dist/lib/audio');
var context = require('../../dist/lib/context');

// MEMO:
// frequency value reference
// http://www.g200kg.com/jp/docs/tech/notefreq.html
describe("Audio", function() {
  var a = null;

  before(function() {
    a = new audio(context());
  });

  describe("#createSound()", function() {
    it("should be frequency value is 880Hz", function() {
      var sound = a.createSound(880);
      assert(sound.frequency.value === 880);
    });
  });
});

// To truncate numbers to 3 decimal digits.
// 3 digits to the right of the decimal point.
// Example:
//   2.3347827465 -> 2.334
//   1109.8439532 -> 1109.843
//   -5.347294791 -> -5.347
var truncateDigits3 = function(num) {
  return parseFloat(num.toString().substring(0, 7));
};
