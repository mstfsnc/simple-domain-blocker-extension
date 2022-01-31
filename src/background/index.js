chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == "install") {
    const defaultDomains = ["doubleclick.net", "google-analytics.com"];
    chrome.storage.local.set({
      domains: defaultDomains.map((domain) => ({ domain, status: false })),
    });
  }
});
