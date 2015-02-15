import convert = require("./Convert");

class Data {
    private static _scores = ["D5", "E5", "G5", "A5", "B5", "G5"];
    public freqs: number[] = [];

    constructor() {
        this._scoresToFreqs(Data._scores);
    }

    public getLinePoints(baseX: number, baseY: number): Array<number>[] {
        return [
            // xStart, yStart, xEnd, yEnd
            [0, (baseY / 2), baseX, (baseY / 2)],
            [(baseX / 3.6), 0, (baseX / 3.6), baseY],
            [(baseX / 1.25), 0, (baseX / 10), baseY],
            [(baseX / 3.9), 0, (baseX / 1.5), baseY],
            [0, (baseY / 4), baseX, (baseY / 4)],
            [(baseX / 1.8), 0, (baseX / 2.8), baseY]
        ];
    }

    private _scoresToFreqs(scores: string[]) {
        scores.forEach((score: string) => {
            this.freqs.push(convert.getFreq(score));
        });
    }
}

export = Data;
