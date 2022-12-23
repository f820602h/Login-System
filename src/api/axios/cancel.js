import axios from "axios";

const pending = new Map();

export function addPending(config) {
  const url = [config.method, config.url].join("&");
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pending.has(url)) pending.set(url, cancel);
    });
}

export function removePending(config) {
  const url = [config.method, config.url].join("&");
  const cancel = pending.get(url);
  if (cancel) {
    cancel(`cancel ${url}`);
    pending.delete(url);
  }
}

export function clearPending() {
  for (const [url, cancel] of pending) {
    cancel(`cancel ${url}`);
  }
  pending.clear();
}
