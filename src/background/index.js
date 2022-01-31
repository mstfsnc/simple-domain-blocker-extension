let blockingCount = 0;
chrome.tabs.onUpdated.addListener(function (tab, changes) {
  if (changes.url) {
    chrome.browserAction.setBadgeText({ text: "" });
    blockingCount = 0;
  }
});

const listener = function () {
  blockingCount++;
  chrome.browserAction.setBadgeText({ text: blockingCount.toString() });
  return { cancel: true };
};
const webRequestHandler = (domains = []) => {
  chrome.webRequest.onBeforeRequest.removeListener(listener);
  const activeDomains = domains.filter((item) => item.status);
  if (activeDomains.length) {
    chrome.webRequest.onBeforeRequest.addListener(
      listener,
      {
        urls: activeDomains.map((item) => `*://*.${item.domain}/*`),
      },
      ["blocking"]
    );
  }
};
chrome.storage.local.get("domains", function ({ domains }) {
  webRequestHandler(domains);
});
chrome.storage.local.onChanged.addListener(async (changes) => {
  webRequestHandler(changes.domains.newValue);
});
chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == "install") {
    const defaultDomains = ["doubleclick.net", "google-analytics.com"];
    chrome.storage.local.set({
      domains: defaultDomains.map((item) => ({ domain: item, status: false })),
    });
  }
});
