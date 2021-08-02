import {Calc} from "./calc";

export class BinaryCalc extends Calc {
    constructor(root) {
        super(root);
    }

    // add numbers in two array
    addNumber(numberArrFirst : number[], numberArrSecond : number[]) {
        let resultArr : number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];

        for (let i = numberArrFirst.length - 1; i >= 0; i--) {
            let carryBit : number = resultArr[i] + numberArrFirst[i] + numberArrSecond[i] ;
            switch (carryBit){
                case 2:
                    resultArr[i] = 0;
                    resultArr[i + 1] = 1;
                    break
                case 3:
                    resultArr[i] = 1;
                    resultArr[i - 1] = 1;
                    break
                default: resultArr[i] = carryBit;
            }
        }
        return resultArr;
    }

    // changing number
    changeNumber(root) {
        const value : HTMLElement | null = root.firstElementChild;
        value.innerText = value.innerText === "0" ? "1" : "0";

        this.check();
        this.update();
    }
}