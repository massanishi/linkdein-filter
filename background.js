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
})