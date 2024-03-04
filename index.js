const submitButton = document.getElementById("submitButton");
const codeInput = document.getElementById("codeInput");
const interpreterOutput = document.getElementById("interpreterOutput");
const outputText = document.getElementById("outputText");
const loadingIcon = document.getElementById("loading");

// Initialize worker thread
let interpreter = new Worker("worker.js", { type: "module" });

// After interpreter finishes, update program output
interpreter.onmessage = (event) => {
  loadingIcon.classList.add("d-none");

  if (event.data.success) {
    outputText.textContent = event.data.result;
  } else {
    outputText.textContent = event.data.err;
    interpreterOutput.classList.add("text-bg-danger");
  }
  interpreterOutput.classList.remove("d-none");
};

// Execute interpreter on submit
submitButton.addEventListener("click", (_) => {
  interpreterOutput.classList.remove("text-bg-danger");
  interpreterOutput.classList.add("d-none");
  loadingIcon.classList.remove("d-none");
  interpreter.postMessage(codeInput.value);
});
