/*global describe, before, beforeEach, after, afterEach, it, assert */
var context = require("../../lib/context");

describe("Context", function() {
  describe(".create", function() {
    it("will return AudioContext instance", function() {
      var ctx = context.create(global);
      assert.equal(ctx instanceof AudioContext, true);
    });
  });
});
