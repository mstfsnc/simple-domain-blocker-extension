import { useState, useEffect } from "react";

export default function (key) {
  const [state, setState] = useState([]);

  useEffect(() => {
    chrome.storage.local.get(key, (data) => {
      setState(data[key] || []);
    });
  }, []);

  const setStorage = function (data) {
    chrome.storage.local.set({ [key]: data }, function () {
      setState(data);
    });
  };

  return [state, setStorage];
}
