import {Calc} from "./calc";

/**
 * class for binary calculator
 */
export class BinaryCalc extends Calc {
    constructor(root: '.binary') {
        super(root);
    }

    // this method is adding numbers from two rows in calculator with the same index, at the end this method is returning array final values 
    addNumber(numberArrFirst: number[], numberArrSecond: number[]): number[] {

        // array with results
        let resultArr: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];

        // replacing values in resultArr, adding numbers starts from the right
        for (let i = numberArrFirst.length - 1; i >= 0; i--) {

            // add values from each row in calculator and and particular value from array with results - resultArr
            let value: number = resultArr[i] + numberArrFirst[i] + numberArrSecond[i];

            // changing array with results -> inserting specific number in resultArr,
            // Two 1's added together makes a 0 appear in their place and a 1 is moved to the left side which increases the result.
            switch (value) {
                case 2:
                    resultArr[i] = 0;
                    resultArr[i + 1] = 1;
                    break
                case 3:
                    resultArr[i] = 1;
                    resultArr[i - 1] = 1;
                    break
                default:
                    resultArr[i] = value;
            }
        }
             // in update() method this resultArr will be reversed.
        return resultArr;
    }

    changeNumber(root: HTMLElement) {

        // specific value box
        const value: HTMLElement = root.firstElementChild as HTMLElement;

        // after click changee the value of field 0 to 1 and vice versa
        value.innerText = value.innerText === "0" ? "1" : "0";

        // setarray with results -> this.resultNumberArray
        this.check();

        // update and display calculator result
        this.update();
    }
}