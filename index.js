// Use ES module import syntax to import functionality from the module
// that we have compiled.
//
// Note that the `default` import is an initialization function which
// will "boot" the module and make it ready to use. Currently browsers
// don't support natively imported WebAssembly as an ES module, but
// eventually the manual initialization won't be required!
import init, { interpret } from "./moonrust/pkg/moonrust.js";

const submitButton = document.getElementById("submitButton");
const codeInput = document.getElementById("codeInput");
const interpreterOutput = document.getElementById("interpreterOutput");
const codeOutput = document.getElementById("codeOutput");
const loadingIcon = document.getElementById("loading");

console.log(loadingIcon);

async function run() {
    async function runInterpreter(code) {
        return interpret(code);
    }

    // First up we need to actually load the wasm file, so we use the
    // default export to inform it where the wasm file is located on the
    // server, and then we wait on the returned promise to wait for the
    // wasm to be loaded.
    await init();

    submitButton.addEventListener("click", async event => {
        try {
            loadingIcon.classList.remove("d-none");

            const result = interpret(codeInput.value);
            console.log(result);
            codeOutput.textContent = result;
            interpreterOutput.classList.remove("d-none");
        } catch (e) {
            console.error(e);
        } finally {
            loadingIcon.classList.add("d-none");
        }
    });
}

run();
