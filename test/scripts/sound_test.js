/*global describe, before, it */
var assert = require('../../node_modules/power-assert');
var sound = require('../../build/sound');

// MEMO:
// frequency value reference
// http://www.g200kg.com/jp/docs/tech/notefreq.html
describe("Sound", function() {
  before(function() {
    sound = new sound();
  });

  describe("#a()", function() {
    it("should be frequency is 880Hz", function() {
      var osc = sound.a("5");
      assert(osc.frequency.value === 880);
    });
  });

  describe("#b()", function() {
    it("should be frequency is 987.766Hz", function() {
      var osc = sound.b("5");
      assert(truncateDigits3(osc.frequency.value) === 987.766);
    });
  });

  describe("#d()", function() {
    it("should be frequency is 587.329Hz", function() {
      var osc = sound.d("5");
      assert(truncateDigits3(osc.frequency.value) === 587.329);
    });
  });

  describe("#e()", function() {
    it("should be frequency is 659.255Hz", function() {
      var osc = sound.e("5");
      assert(truncateDigits3(osc.frequency.value) === 659.255);
    });
  });

  describe("#g()", function() {
    it("should be frequency is 783.99Hz", function() {
      var osc = sound.g("5");
      assert(truncateDigits3(osc.frequency.value) === 783.99);
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
