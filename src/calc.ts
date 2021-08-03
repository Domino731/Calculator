// abstract class, which will be extending by decimal and binary calc
export class Calc {

    private calcName: string;
    private calcDOMElement: HTMLElement | null;
    private resultNumberArray: number[];
    private TopRowNumberArray: number[];
    private BotRowNumberArray: number[];


    constructor(calcSelector: "decimal" | "binary") {
        // calc name - decimal or binary
        this.calcName = calcSelector
        // base on that, the another elements will be downloaded in methods (numbers, results...)
        this.calcDOMElement = document.querySelector(calcSelector);
        // array with results
        this.resultNumberArray = [0, 0, 0, 0, 0, 0, 0, 0, 0]

        // array with numbers, base on that result will be calculated and inserted in resultNumberArray array
        this.TopRowNumberArray = [];
        this.BotRowNumberArray = [];

    }

    /**
     * abstract method - changing number, it will run always when user click on value box
     * @param root - box with value (only red value boxes)
     */
    changeNumber(root: HTMLElement | null) {
        console.error(
            "This method (changeNumber) should be implemented in  inheriting class"
        );
    }

    /** abstract method - adding numbers in two arrays
     *  @param {array} first - array with numbers on top row
     *  @param {array} second - array with numbers on bottom row
     *  @return {array}
     */
    addNumber(first: number[], second: number[]) {
        console.error(
            "This method (changeNumber) should be implemented in  inheriting class"
        );
        return [0, 0, 0, 0, 0, 0, 0, 0];
    }

    /**
     *  method changing result, go through the whole array and putting values into corresponding places in results (blue boxes)
     */
    update() {
        const results = this.calcDOMElement.querySelectorAll<HTMLElement>(
            ".numbers__result span"
        );

        // updating
        this.resultNumberArray.reverse().forEach((number: number, i: number) => {
            const resultValue: string = number.toString()
            return results[i].innerText = resultValue;
        });
    }


    /**
     * this method create two arrays (firstNumberArray and secondNumberArray),
     * at the end it will create third array (resultNumberArray) by adding two previous arrays(firstNumberArray and secondNumberArray)
     */
    check() {
        // DOM
        const calc: HTMLElement = this.calcDOMElement;
        const firstNumber = calc.querySelectorAll<HTMLElement>(".numbers__group .numbers__label:first-child");
        const secondNumber = calc.querySelectorAll<HTMLElement>(
            ".numbers__group .numbers__label:nth-child(2)"
        );
        const resultNumber = calc.querySelectorAll<HTMLElement>(".numbers__group .numbers__result span");

        // creating arrays
        for (let i = firstNumber.length - 1, j = 0; i >= 0; i--, j++) {

            // top row
            const first: number = parseInt(firstNumber[j].firstElementChild.textContent)
            this.TopRowNumberArray[i] = first

            // bottom array
            const second: number = parseInt(secondNumber[j].firstElementChild.textContent)
            this.BotRowNumberArray[i] = second

            const result: number = parseInt(resultNumber[j].textContent)
            this.resultNumberArray[i] = result
        }

        // final array - result
        this.resultNumberArray = this.addNumber(
            this.TopRowNumberArray,
            this.BotRowNumberArray
        );
    }

    // initialization - setting events on clicks
    init() {
        // DOM
        const calc = this.calcDOMElement

        // event on boxes
        calc.addEventListener("click", e => {
            const target = e.target as Element;

            // checking if element is red value box
            if ((target.parentElement.classList.contains("numbers__label"))) {

                // specific value box with value
                const parentLabel = target.parentElement;

                // changing number
                this.changeNumber(parentLabel);
            }
        });
    }

    getFirstNumberArray(): number[] {
        return this.TopRowNumberArray
    }

    getSecondNumberArray(): number[] {
        return this.BotRowNumberArray
    }
}