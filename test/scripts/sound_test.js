/*global describe, before, it */
var assert = require('../../node_modules/power-assert');
var sound = require('../../build/lib/sound');

// MEMO:
// frequency value reference
// http://www.g200kg.com/jp/docs/tech/notefreq.html
describe("Sound", function() {
  before(function() {
    sound = new sound();
  });

  describe("#oscillator()", function() {
    it("should be frequency value is 880Hz", function() {
      var osc = sound.oscillator("A5");
      assert(osc.frequency.value === 880);
    });
  });
});

// To truncate numbers to 3 decimal digits.
// 3 digits to the right of the decimal point.
// Example:
//   2.3347827465 -> 2.334
//   1109.8439532 -> 1109.843
//   -5.347294791 -> -5.347
var truncateDigits3 = function (num) {
  return parseFloat(num.toString().substring(0, 7));
};
