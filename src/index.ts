import "./sass/main.scss"
import { BinaryCalc } from "./calc/binaryCalc";
import { DecimalCalc } from "./calc/decimalCalc";


document.addEventListener("DOMContentLoaded", () => {
    const bitCalc: BinaryCalc = new BinaryCalc(".binary");
    const decCalc: DecimalCalc = new DecimalCalc(".decimal");
});