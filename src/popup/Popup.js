import React, { useEffect, useState } from "react";
import "./Popup.scss";
import Add from "./components/add";
import Status from "./components/status";
import Remove from "./components/remove";
import useStorage from "./hooks/useStorage";

export default () => {
  const [input, setInput] = useState("");
  const [domains, setDomains] = useStorage("domains");

  const netRequest = chrome.declarativeNetRequest;

  useEffect(
    async function () {
      const removeRuleIds = await netRequest
        .getDynamicRules()
        .then(function (rules) {
          return rules.map((r) => r.id);
        });
      netRequest.updateDynamicRules({
        removeRuleIds,
      });

      const activeDomains = domains.filter((item) => item.status);
      if (activeDomains.length) {
        const addRules = activeDomains.map((item, index) => ({
          id: index + 1,
          condition: {
            urlFilter: `||${item.domain}`,
            resourceTypes: Object.values(netRequest.ResourceType),
          },
          action: { type: "block" },
        }));

        netRequest.updateDynamicRules({
          addRules,
        });
      }
    },
    [domains]
  );

  function addHandler() {
    const matched = input.match(
      /[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/
    );
    if (matched) {
      if (domains.indexOf(matched[0]) === -1) {
        setDomains([
          {
            domain: matched[0],
            status: true,
          },
          ...domains,
        ]);
      }
      setInput("");
    }
  }
  function removeHandler(domain) {
    setDomains(domains.filter((item) => item.domain !== domain));
  }
  function statusHandler(domain) {
    setDomains(
      domains.map((item) =>
        item.domain === domain ? { ...item, status: !item.status } : item
      )
    );
  }
  return (
    <div className="app">
      <table>
        <thead>
          <tr>
            <th>domain</th>
            <th>status</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={2}>
              <input
                autoFocus
                type="text"
                className="input"
                placeholder="eg: google.com"
                value={input}
                onChange={function (event) {
                  setInput(event.target.value);
                }}
                onKeyPress={function (event) {
                  if (event.key === "Enter") {
                    addHandler();
                  }
                }}
              />
            </td>
            <td>
              <Add onClick={addHandler} />
            </td>
          </tr>
          {domains.map(function (item, index) {
            return (
              <tr key={index} className={item.status ? "active" : "passive"}>
                <td>{item.domain}</td>
                <td>
                  <Status
                    checked={item.status}
                    onChange={function () {
                      statusHandler(item.domain);
                    }}
                  />
                </td>
                <td>
                  <Remove
                    onClick={function () {
                      removeHandler(item.domain);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
