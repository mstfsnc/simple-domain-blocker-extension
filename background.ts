import { addDomain } from "~state/slice"
import { persistor, store } from "~state/store"

chrome.runtime.onInstalled.addListener(async function (details) {
  if (details.reason == "install") {
    const defaultDomains = ["doubleclick.net", "google-analytics.com"]
    defaultDomains.forEach((domain) => {
      store.dispatch(
        addDomain({
          domain,
          enabled: false
        })
      )
    })
    persistor.resync()
  }
})

store.subscribe(async () => {
  const state = store.getState()
  if (state) {
    const blockableDomains = state.domains
      .filter((d) => d.enabled)
      .map((d) => d.domain)

    chrome.declarativeNetRequest.getDynamicRules((currentRules) => {
      const currentDomains = currentRules.map((rule) =>
        rule.condition.urlFilter.replace("||", "")
      )

      // Find domains to remove
      const domainsToRemove = currentDomains.filter(
        (domain) => !blockableDomains.includes(domain)
      )
      const rulesToRemove = currentRules.filter((rule) =>
        domainsToRemove.includes(rule.condition.urlFilter.replace("||", ""))
      )

      // Find domains to add
      const domainsToAdd = blockableDomains.filter(
        (domain) => !currentDomains.includes(domain)
      )
      const rulesToAdd = domainsToAdd.map((domain) => ({
        id: Math.floor(Math.random() * 100000000),
        action: { type: "block" },
        condition: {
          urlFilter: `||${domain}`,
          resourceTypes: Object.values(
            chrome.declarativeNetRequest.ResourceType
          )
        }
      }))

      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: rulesToRemove.map((rule) => rule.id),
        addRules: rulesToAdd
      })
    })
  }
})
