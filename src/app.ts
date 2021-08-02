import "../sass/main.scss"
import {BinaryCalc} from "./binaryCalc";

document.addEventListener("DOMContentLoaded", () => {
    const bitCalc : BinaryCalc = new BinaryCalc(".binary");
    bitCalc.initEvents()
});