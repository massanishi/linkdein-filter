// Tab must be listened because Linkedin is a single app and it does not reload when navigating pages.
// This does not get called at the initial loading.
chrome.tabs.onUpdated.addListener((_, __, tab) => {
  // Release previus feed.

  if (tab.status === 'complete') {
    const payload = {
      type: 'PAGE_RELOADED',
    };
    chrome.tabs.sendMessage(tab.id, payload);
  }
});

function disable(disabling) {
  const payload = {
    disabled: disabling,
  };

  return new Promise((resolve) => {
    chrome.storage.sync.set(payload, () => {
      resolve();
    });
  });


}

function getDisabledStatus() {

  return new Promise((resolve) => {
    chrome.storage.sync.get('disabled', (result) => {
      // Result is empty in Firefox using temporary add-on id.
      if (!result) return Promise.resolve(false);

      // Make it opposite to convert undefined to false;
      const disabled = !!result['disabled'];
      resolve(disabled);
    });
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { tab } = sender;
  const tabId = tab && tab.id || undefined;
  const { type } = request;

  if (type === 'IS_DISABLED') {
    getDisabledStatus()
    .then(disabled => {
      sendResponse({
        disabled,
      });
    });
    return true;
  } else if (type === 'UPDATE_DISABLED') {
    const disabling = request.disabling;
    disable(disabling)
    .then(() => {
      sendResponse({
        status: 'success',
      });
    });
    return true;
  }
});
