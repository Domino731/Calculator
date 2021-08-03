import {Calc} from "./calc";

export class DecimalCalc extends Calc{

    private tooltip: HTMLElement | null;
    private operator: HTMLElement | null;

    constructor(selector) {
        super(selector);
        this.tooltip = document.querySelector(".tooltip");
        this.operator = document.querySelector("#decimalOperator")
    }

    showTooltip (text: string) {
        this.tooltip.innerText = text
        this.tooltip.classList.add("active")
    }

    hideTooltip () {
        this.tooltip.classList.remove("active")
    }

    changeNumber(parentElement ) {
        const valueBox = parentElement.firstElementChild;
        valueBox.contentEditable = true
        valueBox.focus();
        this.showTooltip("Click to add values");
    }

    addNumber(first: number[], second: number[]): number[] {

        const summary : number[] = [];
        for (let i = first.length - 1; i >= 0; i--) {
            const sumRows : number = first[i] + second[i];
            const sum : number = typeof summary[i] === "undefined" ? sumRows : sumRows + summary[i];

            if (sum > 9) {
                summary[i] = sum % 10;
                summary[i + 1] = 1;
            } else {
                summary[i] = sum;
            }
        }

        return summary;
    }

    check()  {
        super.check();
        return [...this.getFirstNumberArray(), ...this.getSecondNumberArray()]
            .every((el) => {
            return typeof el === "number" && el < 10 && el >= 0;
        });
    }

    init() {
        super.init();
        this.operator.addEventListener("click", e => {
            this.hideTooltip()
            const checkNumbers = this.check()
            checkNumbers ? this.update() :  this.showTooltip("Values must be numbers (0-9)");
        })
    }
}