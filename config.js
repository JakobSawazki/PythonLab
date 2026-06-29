window.PYLAB_CONFIG = Object.freeze({
  // Nach dem Deployment des Workers hier dessen öffentliche /feedback-URL eintragen.
  // Der Gemini-Schlüssel gehört ausschließlich als Secret in den Worker, niemals in diese Datei.
  aiFeedbackEndpoint: "https://pythonlab-ai-feedback.jakob-sawazki.workers.dev/feedback",
  aiProviderLabel: "Google Gemini",
  aiPrivacyUrl: "https://ai.google.dev/gemini-api/docs/pricing"
});
