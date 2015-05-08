import convert = require("./convert");

class Data {
    private static _scores: string[] = ["D5", "E5", "G5", "A5", "B5", "G5"];
    private static _lineAngle: number[] = [0, 90, 45, 130, 0, 70];
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

    get lineAngle(): number[] {
        return Data._lineAngle;
    }
}

export = Data;
