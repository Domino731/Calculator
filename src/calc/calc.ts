/** abstract class for calculator */
export abstract class Calc {

    /** Calculator container */
    private calcContainer: HTMLElement | null;
    /** array with zeros which is representing the final result of adding values in calc*/
    private resultNumberArray: number[];
    /** array with values in top row in calculator */
    private TopRowNumberArray: number[];
    /** array with values in bottom row in calculator */
    private BotRowNumberArray: number[];

    /** 
     * @param calcSelector - string needed to search specific element in DOM with calculator 
     */
    constructor(calcSelector: ".decimal" | ".binary") {

        this.calcContainer = document.querySelector(calcSelector);
        this.resultNumberArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.TopRowNumberArray = [];
        this.BotRowNumberArray = [];
    }

    /**
     * abstract method - changing number, it will run always when user click on value box
     * @param root - box with value (only red value boxes)
     */
    changeNumber(root: HTMLElement) {
        console.error(
            "This method (changeNumber) should be implemented in  inheriting class"
        );
    }

    /** abstract method - adding numbers in two arrays
     *  @param {array} first - array with numbers on top row
     *  @param {array} second - array with numbers on bottom row
     */
    addNumber(first: number[], second: number[]) {
        console.error(
            "This method (changeNumber) should be implemented in  inheriting class"
        );
        return [0, 0, 0, 0, 0, 0, 0, 0];
    }

    /**
     *  method that is displaying result in calculator (blue boxes), go through the whole array and putting values into corresponding places in results (blue boxes)
     */
    update() {

        // find blue boxes with are needed to inject result values 
        const results : NodeListOf<HTMLElement> = this.calcContainer.querySelectorAll( ".numbers__result span");
           
        // displaying result in calc
        this.resultNumberArray.reverse().forEach((value: number, index: number) => {
            const resultValue: string = value.toString();
            return results[index].innerText = resultValue;
        });
    }


    /**
     * this method create two arrays (firstNumberArray and secondNumberArray),
     * at the end it will create third array (resultNumberArray) by adding two previous arrays(firstNumberArray and secondNumberArray)
     */
    check() {

        // find elements from DOM tree which are needed to get from them specific number in order to create array with results (this.resultNumberArray)
        const calc: HTMLElement = this.calcContainer;
        const firstNumber : NodeListOf<HTMLElement> = calc.querySelectorAll(".numbers__group .numbers__label:first-child");
        const secondNumber : NodeListOf<HTMLElement> = calc.querySelectorAll( ".numbers__group .numbers__label:nth-child(2)");
        const resultNumber : NodeListOf<HTMLElement>  = calc.querySelectorAll(".numbers__group .numbers__result span");

        // creating arrays
        for (let i = firstNumber.length - 1, j = 0; i >= 0; i--, j++) {

            // add number from top row 
            const first: number = parseInt(firstNumber[j].firstElementChild.textContent);
            this.TopRowNumberArray[i] = first;

            // add number from bottom row 
            const second: number = parseInt(secondNumber[j].firstElementChild.textContent);
            this.BotRowNumberArray[i] = second;

            // calculate the result array
            const result: number = parseInt(resultNumber[j].textContent);
            this.resultNumberArray[i] = result;
        }

        // array with results
        this.resultNumberArray = this.addNumber(
            this.TopRowNumberArray,
            this.BotRowNumberArray
        );
    }

    // initialization of calculator - add click event on calculator container in order to change final result
    init() {

        // event on boxes
        this.calcContainer.addEventListener("click", e => {
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

    /** return array with numbers from top row in calculator */
    getFirstNumberArray(): number[] {
        return this.TopRowNumberArray;
    }

     /** return array with numbers from bottom row in calculator */
    getSecondNumberArray(): number[] {
        return this.BotRowNumberArray;
    }
}