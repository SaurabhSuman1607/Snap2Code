document.getElementById("copyBtn").addEventListener("click", () => {
  chrome.tabs.captureVisibleTab(null, { format: "png" }, function (dataUrl) {
    Tesseract.recognize(dataUrl, "eng", {
      corePath: chrome.runtime.getURL("tesseract-core.wasm.js"),
      logger: (m) => console.log(m),
    }).then(({ data: { text } }) => {
      navigator.clipboard
        .writeText(text)
        .then(() => alert("✅ Code copied!"))
        .catch((err) => alert("❌ Copy failed: " + err));
    });
  });
});
