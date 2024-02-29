// What: JS file for a worker thread that initializes the wasm files and
// runs the interpreter when requested.
//
// Why: Calling the interpreter directly from the main thread will block
// the browser until completion. For long running programs, this makes
// the page unresponsive. By having a dedicated worker thread for the
// interpreter, we can let users interact with the page while the Lua
// program evaluates.

// Imports the compiled MoonRust code. The `default` import is an
// initialization function which will "boot" the module and make it ready
// to use. Currently browsers don't support natively imported WebAssembly
// as an ES module, but eventually the manual initialization won't be required!
import init, { interpret } from "./moonrust/pkg/moonrust.js";

// Load the wasm files
async function run() {
  await init();
}

// Call the interpreter when requested
onmessage = (event) => postMessage(interpret(event.data));

run();
