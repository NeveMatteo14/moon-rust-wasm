import init, { interpret } from "./moonrust/pkg/moonrust.js";

async function run() {
    await init();
}

onmessage = event => postMessage(interpret(event.data));

run();
