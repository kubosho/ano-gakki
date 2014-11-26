/*global describe, before, it, assert */
describe('Sounds', function () {
  describe('#add()', function () {
    it('should be return 5', function () {
      assert(math.add(3, 2) === 5);
    });
  });

  describe('#sub()', function () {
    it('should be return 1', function () {
      assert(math.sub(3, 2) === 1);
    });
  });

  describe('#multi()', function () {
    it('should be return 6', function () {
      assert(math.multi(3, 2) === 6);
    });
  });

  describe('#div()', function () {
    it('should be return 1.5', function () {
      assert(math.div(3, 2) === 1.5);
    });
  });

  describe('#remainder()', function () {
    it('should be return 1', function () {
      assert(math.remainder(3, 2) === 1);
    });
  });
});
