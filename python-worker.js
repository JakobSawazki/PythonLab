import { loadPyodide } from "https://cdn.jsdelivr.net/pyodide/v0.29.4/full/pyodide.mjs";

const INDEX_URL = "https://cdn.jsdelivr.net/pyodide/v0.29.4/full/";
let pyodide;

async function initialize() {
  pyodide = await loadPyodide({ indexURL: INDEX_URL });
  self.postMessage({ type: "ready" });
}

initialize().catch((error) => {
  self.postMessage({
    type: "init-error",
    error: error instanceof Error ? error.message : String(error)
  });
});

self.onmessage = async (event) => {
  const { type, requestId, code, inputs = "", testCode = "" } = event.data || {};
  if (type !== "run" || !pyodide) {
    return;
  }

  const stdout = [];
  const stderr = [];
  const inputQueue = String(inputs).split(/\r?\n/);
  let globals;

  pyodide.setStdout({ batched: (value) => stdout.push(value) });
  pyodide.setStderr({ batched: (value) => stderr.push(value) });
  pyodide.setStdin({
    stdin: () => inputQueue.length ? inputQueue.shift() : null,
    isatty: false
  });

  try {
    globals = pyodide.runPython("dict()");
    globals.set("__pylab_source__", String(code));
    await pyodide.runPythonAsync(String(code), { globals });

    if (testCode) {
      await pyodide.runPythonAsync(String(testCode), { globals });
    }

    const combinedOutput = stdout.join("\n");
    const testsPassed = combinedOutput.includes("__PYLAB_TESTS_OK__");
    self.postMessage({
      type: "result",
      requestId,
      stdout: combinedOutput.replace(/\n?__PYLAB_TESTS_OK__\n?/g, "").trimEnd(),
      stderr: stderr.join("\n"),
      testsPassed
    });
  } catch (error) {
    const combinedOutput = stdout.join("\n");
    self.postMessage({
      type: "result",
      requestId,
      stdout: combinedOutput.replace(/\n?__PYLAB_TESTS_OK__\n?/g, "").trimEnd(),
      stderr: stderr.join("\n"),
      error: error instanceof Error ? error.message : String(error),
      testsPassed: false
    });
  } finally {
    if (globals) {
      globals.destroy();
    }
  }
};
