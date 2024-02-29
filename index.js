const submitButton = document.getElementById("submitButton");
const codeInput = document.getElementById("codeInput");
const interpreterOutput = document.getElementById("interpreterOutput");
const outputText = document.getElementById("outputText");
const loadingIcon = document.getElementById("loading");

let interpreter = new Worker("worker.js", { type: "module" });
interpreter.onmessage = (event) => {
  outputText.textContent = event.data;
  interpreterOutput.classList.remove("d-none");
  loadingIcon.classList.add("d-none");
};
interpreter.onerror = (error) => {
  console.error(error);
  loadingIcon.classList.add("d-none");
};

submitButton.addEventListener("click", (_) => {
  loadingIcon.classList.remove("d-none");
  interpreter.postMessage(codeInput.value);
});
