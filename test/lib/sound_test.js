/*global describe, before, it */
var Sound = require("../../src/sound");

describe("sound", function() {
  var ctx = new AudioContext();
  var sound = null;

  before(function() {
    var scores = ["D5", "E5", "G5", "A5", "B5", "G5"];
    sound = new Sound(ctx, scores);
  });
});
