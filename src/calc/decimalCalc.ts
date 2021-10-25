import { Calc } from "./calc";

/** Class for decimal calculator */
export class DecimalCalc extends Calc {

    /** Wrapper of tooltip */
    private tooltip: HTMLElement | null;
    /** calculator operator, needed to apply at him click event with callback function which is reponsible for calculataing result */
    private operator: HTMLElement | null;

    constructor(selector: ".decimal") {
        super(selector);
        this.tooltip = document.querySelector(".tooltip");
        this.operator = document.querySelector("#decimalOperator");
    }

    /**
     * display tool tip container
     * @param text - text that you want to insert into tooltip
     */
    showTooltip(text: string) {
        this.tooltip.innerText = text;
        this.tooltip.classList.add("active");
    }

    /** remove tooltip */
    hideTooltip() {
        this.tooltip.classList.remove("active");
    }


    changeNumber(parentElement: HTMLElement) {

        // set content editable to this box in order to allow user edit value
        const valueBox: HTMLElement = parentElement.firstElementChild as HTMLElement;
        valueBox.contentEditable = 'true';
        valueBox.focus();

        // when user enter new value, show tooltip to inform him what's next
        this.showTooltip("Click to add values");
    }

    // calculating summary array which is the result of adding the numbers from two arrays
    addNumber(firstArr: number[], secondArr: number[]): number[] {

        // array with summary values
        const summary: number[] = [];

        // updating summary array, adding numbers starts from the right
        for (let i = firstArr.length - 1; i >= 0; i--) {

            // the sum from two rows with the same array index.
            const sumRows: number = firstArr[i] + secondArr[i];

            // check if value in summary is empty, if no then add this value to the sum
            const sum: number = typeof summary[i] === "undefined" ? sumRows : sumRows + summary[i];

            // updating summary array, pushing new values ahead in array

            // if the sum is greater than 9 you is needed to create shift in summary array
            if (sum > 9) {
                summary[i] = sum % 10;
                summary[i + 1] = 1;
            } else {
                summary[i] = sum;
            }
        }

        // in update() method this resultArr will be reversed.
        return summary;
    }

    // check if the values entered by the user are numbers
    check(): boolean {
        super.check();

        // checking if a value entered by user is a number, less than 10 and greater or eqaul to 0
        return [...this.getFirstNumberArray(), ...this.getSecondNumberArray()]
            .every((el) => {
                return typeof el === "number" && el < 10 && el >= 0;
            });
    }

    // initialization, add click event on calc operator with callback function in order display result of entered numbers 
    init() {
        super.init();

        // event for red value box
        this.operator.addEventListener("click", e => {

            // hide tooltip
            this.hideTooltip();

            // value validation 
            const checkNumbers: boolean = this.check();
            checkNumbers ? this.update() : this.showTooltip("Values must be numbers (0-9)");
        });
    }
}