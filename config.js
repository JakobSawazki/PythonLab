window.PYLAB_CONFIG = Object.freeze({
  // Nach dem Deployment des Workers hier dessen öffentliche /feedback-URL eintragen.
  // Der Gemini-Schlüssel gehört ausschließlich als Secret in den Worker, niemals in diese Datei.
  aiFeedbackEndpoint: "https://pythonlab-ai-feedback.jakob-sawazki.workers.dev/feedback",
  aiProviderLabel: "Google Gemini",
  aiPrivacyUrl: "https://ai.google.dev/gemini-api/docs/pricing",
  // Optional: Später kann hier ein geschützter Worker-Endpunkt eingetragen werden,
  // der Feedback direkt als GitHub-Issue anlegt. Ohne Endpoint öffnet PythonLab
  // ein vorbereitetes GitHub-Issue, das bewusst noch manuell abgeschickt wird.
  feedbackEndpoint: "",
  feedbackIssueUrl: "https://github.com/JakobSawazki/PythonLab/issues/new"
});
