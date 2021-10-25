import {Calc} from "./calc";

export class DecimalCalc extends Calc {

    private tooltip: HTMLElement | null;
    private operator: HTMLElement | null;

    constructor(selector: ".decimal") {
        super(selector);
        this.tooltip = document.querySelector(".tooltip");
        this.operator = document.querySelector("#decimalOperator")
    }

    /**
     * @param text {string} - text that you want to insert into tooltip
     */
    showTooltip(text: string) {
        this.tooltip.innerText = text
        this.tooltip.classList.add("active")
    }

    /**
     * hide too tip
     */
    hideTooltip() {
        this.tooltip.classList.remove("active")
    }


    changeNumber(parentElement: HTMLElement) {
        const valueBox : HTMLElement = parentElement.firstElementChild as HTMLElement;

        // allow user to edit value
        valueBox.contentEditable = 'true';
        valueBox.focus();

        // when user enter new value, show tooltip to inform him what's next
        this.showTooltip("Click to add values");
    }

    // adding new values
    addNumber(first: number[], second: number[]): number[] {

        // array with summary
        const summary: number[] = [];

        // updating summary array
        for (let i = first.length - 1; i >= 0; i--) {

            //The sum of two places with the same array index.
            const sumRows: number = first[i] + second[i];

            // summary from two rows on the same align
            const sum: number = typeof summary[i] === "undefined" ? sumRows : sumRows + summary[i];

            // updating summary array, pushing new values ahead in array
            if (sum > 9) {
                summary[i] = sum % 10;
                summary[i + 1] = 1;
            } else {
                summary[i] = sum;
            }
        }

        return summary;
    }

    // adding new values validation
    check() {
        super.check();
        return [...this.getFirstNumberArray(), ...this.getSecondNumberArray()]
            .every((el) => {
                // checking if user enter negative number
                return typeof el === "number" && el < 10 && el >= 0;
            });
    }

    // initialization
    init() {
        super.init();

        // event for red value box
        this.operator.addEventListener("click", e => {

            // hide tooltip
            this.hideTooltip()

            // validation
            const checkNumbers = this.check()
            checkNumbers ? this.update() : this.showTooltip("Values must be numbers (0-9)");
        })
    }
}