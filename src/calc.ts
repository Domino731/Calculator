// abstract class, which will be extending by decimal and binary calc
export class Calc {

    private calcName: string;
    private $calcDOMElement: HTMLElement | null;
    private resultNumberArray: number[];
    private firstNumberArray: number[];
    private secondNumberArray: number[];


    constructor(calcSelector: "decimal" | "binary") {
        // calc name - decimal or binary
        this.calcName = calcSelector
        // base on that, the another elements will be downloaded in methods (numbers, results...)
        this.$calcDOMElement = document.querySelector(calcSelector);
        // array with results
        this.resultNumberArray = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        // array with numbers, base on that result will be calculated and inserted in resultNumberArray array
        this.firstNumberArray = [];
        this.secondNumberArray = [];

    }

    // abstract method - changing number
    changeNumber(root: HTMLElement) {
        console.error(
            "This method (changeNumber) should be implemented in  inheriting class"
        );
    }

    /** abstract method - adding numbers in two arrays
     *  @param {array} first - first number
     *  @param {array} second - second number
     *  @return {array}
     */
    addNumber(first: number[], second: number[]) {
        console.error(
            "This method (changeNumber) should be implemented in  inheriting class"
        );
        return [0, 0, 0, 0, 0, 0, 0, 0];
    }

    // method changing result
    update() {
        const results = this.$calcDOMElement.querySelectorAll<HTMLElement>(
            ".numbers__result span"
        );
        this.resultNumberArray.reverse().forEach((number: number, i: number) => {
            const resultValue: string = number.toString()
            results[i].innerText = resultValue;
        });
    }

    check() {
        // DOM
        let calc = this.$calcDOMElement;
        let $firstNumber = calc.querySelectorAll<HTMLElement>(".numbers__group label:first-child");
        let $secondNumber = calc.querySelectorAll<HTMLElement>(
            ".numbers__group label:nth-child(2)"
        );
        let $resultNumber = calc.querySelectorAll<HTMLElement>(".numbers__group .result-bit");


        for (let i = $firstNumber.length - 1, j = 0; i >= 0; i--, j++) {

            const first: number = parseInt($firstNumber[j].firstElementChild.textContent)
            this.firstNumberArray[i] = first

            const second: number = parseInt($secondNumber[j].firstElementChild.textContent)
            this.secondNumberArray[i] = second

            const result: number = parseInt($resultNumber[j].firstElementChild.textContent)
            this.resultNumberArray[i] = result
        }

        console.log(this.firstNumberArray, this.secondNumberArray);
        this.resultNumberArray = this.addNumber(
            this.firstNumberArray,
            this.secondNumberArray
        );
    }

    // initialization - setting events on clicks
    initEvents() {
        const calc = this.$calcDOMElement
        calc.addEventListener("click", e => {
            const target =  e.target as Element;
            if ((target.parentElement.classList.contains("numbers__label"))) {
                const parentLabel = target.parentElement;
                this.changeNumber(parentLabel);
            }
        });
    }
}