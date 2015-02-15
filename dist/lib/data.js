var convert = require("./Convert");
var Data = (function () {
    function Data() {
        this.freqs = [];
        this._scoresToFreqs(Data._scores);
    }
    Data.prototype.getLinePoints = function (baseX, baseY) {
        return [
            [0, (baseY / 2), baseX, (baseY / 2)],
            [(baseX / 3.6), 0, (baseX / 3.6), baseY],
            [(baseX / 1.25), 0, (baseX / 10), baseY],
            [(baseX / 3.9), 0, (baseX / 1.5), baseY],
            [0, (baseY / 4), baseX, (baseY / 4)],
            [(baseX / 1.8), 0, (baseX / 2.8), baseY]
        ];
    };
    Data.prototype._scoresToFreqs = function (scores) {
        var _this = this;
        scores.forEach(function (score) {
            _this.freqs.push(convert.getFreq(score));
        });
    };
    Data._scores = ["D5", "E5", "G5", "A5", "B5", "G5"];
    return Data;
})();
module.exports = Data;
