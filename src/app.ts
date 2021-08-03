import "../sass/main.scss"
import {BinaryCalc} from "./binaryCalc";
import {DecimalCalc} from "./decimalCalc";

document.addEventListener("DOMContentLoaded", () => {
    const bitCalc : BinaryCalc = new BinaryCalc(".binary");
    bitCalc.init()

    const decCalc : DecimalCalc = new DecimalCalc(".decimal")
    decCalc.init()
});