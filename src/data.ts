import convert = require("./convert");

class Data {
    private static _scores: string[] = ["D5", "E5", "G5", "A5", "B5", "G5"];
    private static _freqs: number[] = [];

    constructor() {
        this.freqs = convert.scoresToFreqs(Data._scores);
    }

    get freqs(): number[] {
        return Data._freqs;
    }

    set freqs(freqs: number[]) {
        Data._freqs = freqs;
    }

    public getLinePoints(baseX: number, baseY: number): Array<number>[] {
        return [ // xStart, yStart, xEnd, yEnd
            [0, (baseY / 2), baseX, (baseY / 2)],
            [(baseX / 3.6), 0, (baseX / 3.6), baseY],
            [(baseX / 1.25), 0, (baseX / 10), baseY],
            [(baseX / 3.9), 0, (baseX / 1.5), baseY],
            [0, (baseY / 4), baseX, (baseY / 4)],
            [(baseX / 1.8), 0, (baseX / 2.8), baseY]
        ];
    }
}

export = Data;
