// Use ES module import syntax to import functionality from the module
// that we have compiled.
//
// Note that the `default` import is an initialization function which
// will "boot" the module and make it ready to use. Currently browsers
// don't support natively imported WebAssembly as an ES module, but
// eventually the manual initialization won't be required!
// import init, { interpret } from "./moonrust/pkg/moonrust.js";

const submitButton = document.getElementById("submitButton");
const codeInput = document.getElementById("codeInput");
const interpreterOutput = document.getElementById("interpreterOutput");
const codeOutput = document.getElementById("codeOutput");
const loadingIcon = document.getElementById("loading");

let interpreter = new Worker("worker.js", { type: "module" });
interpreter.onmessage = event => {
    codeOutput.textContent = event.data;
    interpreterOutput.classList.remove("d-none");
    loadingIcon.classList.add("d-none");
};
interpreter.onerror = error => {
    console.error(error);
    loadingIcon.classList.add("d-none");
};

submitButton.addEventListener("click", event => {
    loadingIcon.classList.remove("d-none");

    // try {
    //     const result = await interpret(codeInput.value);
    //     codeOutput.textContent = result;
    //     interpreterOutput.classList.remove("d-none");
    // } catch (e) {
    //     console.error(e);
    // } finally {
    //     loadingIcon.classList.add("d-none");
    // }

    interpreter.postMessage(codeInput.value);
});

// async function run() {
//     // First up we need to actually load the wasm file, so we use the
//     // default export to inform it where the wasm file is located on the
//     // server, and then we wait on the returned promise to wait for the
//     // wasm to be loaded.
//     await init();

// }

// run();
