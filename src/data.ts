import convert = require("./Convert");

class Data {
    private static _scores = ["D5", "E5", "G5", "A5", "B5", "G5"];
    public freqs: number[] = [];

    constructor() {
        this._scoresToFreqs(Data._scores);
    }

    private _scoresToFreqs(scores: string[]) {
        scores.forEach((score: string) => {
            this.freqs.push(convert.getFreq(score));
        });
    }
}

export = Data;
