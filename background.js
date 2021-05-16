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

function getDisabledImageHideStatus() {
  return new Promise((resolve) => {
    chrome.storage.sync.get('disabled-image-hide', (result) => {
      // Result is empty in Firefox using temporary add-on id.
      if (!result) return Promise.resolve(true);

      // Default is disabled.
      if (result['disabled-image-hide'] === undefined) return true;

      // Make it opposite to convert undefined to false;
      const disabled = !!result['disabled-image-hide'];
      resolve(disabled);
    });
  });
}

function disableImageHide(disabling) {
  const payload = {
    ['disabled-image-hide']: disabling,
  };

  return new Promise((resolve) => {
    chrome.storage.sync.set(payload, () => {
      resolve();
    });
  });
}

function getDisabledVideoHideStatus() {
  return new Promise((resolve) => {
    chrome.storage.sync.get('disabled-video-hide', (result) => {
      // Result is empty in Firefox using temporary add-on id.
      if (!result) return Promise.resolve(true);

      // Default is disabled.
      if (result['disabled-video-hide'] === undefined) return true;

      // Make it opposite to convert undefined to false;
      const disabled = !!result['disabled-video-hide'];
      resolve(disabled);
    });
  });
}

function disableVideoHide(disabling) {
  const payload = {
    ['disabled-video-hide']: disabling,
  };

  return new Promise((resolve) => {
    chrome.storage.sync.set(payload, () => {
      resolve();
    });
  });
}

function getDisabledLinkHideStatus() {
  return new Promise((resolve) => {
    chrome.storage.sync.get('disabled-link-hide', (result) => {
      // Result is empty in Firefox using temporary add-on id.
      if (!result) return Promise.resolve(true);

      // Default is disabled.
      if (result['disabled-link-hide'] === undefined) return true;

      // Make it opposite to convert undefined to false;
      const disabled = !!result['disabled-link-hide'];
      resolve(disabled);
    });
  });
}

function disableLinkHide(disabling) {
  const payload = {
    ['disabled-link-hide']: disabling,
  };

  return new Promise((resolve) => {
    chrome.storage.sync.set(payload, () => {
      resolve();
    });
  });
}

function getDisabledDocumentHideStatus() {
  return new Promise((resolve) => {
    chrome.storage.sync.get('disabled-document-hide', (result) => {
      // Result is empty in Firefox using temporary add-on id.
      if (!result) return Promise.resolve(true);

      // Default is disabled.
      if (result['disabled-document-hide'] === undefined) return true;

      // Make it opposite to convert undefined to false;
      const disabled = !!result['disabled-document-hide'];
      resolve(disabled);
    });
  });
}

function disableDocumentHide(disabling) {
  const payload = {
    ['disabled-document-hide']: disabling,
  };

  return new Promise((resolve) => {
    chrome.storage.sync.set(payload, () => {
      resolve();
    });
  });
}

function getDisabledPromotionHideStatus() {
  return new Promise((resolve) => {
    chrome.storage.sync.get('disabled-promotion-hide', (result) => {
      // Result is empty in Firefox using temporary add-on id.
      if (!result) return Promise.resolve(true);

      // Default is disabled.
      if (result['disabled-promotion-hide'] === undefined) return true;

      // Make it opposite to convert undefined to false;
      const disabled = !!result['disabled-promotion-hide'];
      resolve(disabled);
    });
  });
}

function getDisabledDistractionsHideStatus() {
  return new Promise((resolve) => {
    chrome.storage.sync.get('disabled-distractions-hide', (result) => {
      // Result is empty in Firefox using temporary add-on id.
      if (!result) return Promise.resolve(false);

      // Make it opposite to convert undefined to false;
      const disabled = !!result['disabled-distractions-hide'];
      resolve(disabled);
    });
  });
}

function getDisabledActivityHideStatus() {
  return new Promise((resolve) => {
    chrome.storage.sync.get('disabled-activitiy-hide', (result) => {
      // Result is empty in Firefox using temporary add-on id.
      if (!result) return Promise.resolve(false);

      // Make it opposite to convert undefined to false;
      const disabled = !!result['disabled-activitiy-hide'];
      resolve(disabled);
    });
  });
}

function disablePromotionHide(disabling) {
  const payload = {
    ['disabled-promotion-hide']: disabling,
  };

  return new Promise((resolve) => {
    chrome.storage.sync.set(payload, () => {
      resolve();
    });
  });
}

function disableDistractions(disabling) {
  const payload = {
    ['disabled-distractions-hide']: disabling,
  };

  return new Promise((resolve) => {
    chrome.storage.sync.set(payload, () => {
      resolve();
    });
  });
}

function disableActivities(disabling) {
  const payload = {
    ['disabled-activitiy-hide']: disabling,
  };

  return new Promise((resolve) => {
    chrome.storage.sync.set(payload, () => {
      resolve();
    });
  });
}

function addKeywordHide(text) {

  return new Promise((resolve) => {
    chrome.storage.sync.get('keywords-hide', (result) => {
      // Result is empty in Firefox using temporary add-on id.
      let keywords;
      if (!result || !result['keywords-hide']) {
        keywords = [text];
      } else {
        keywords = result['keywords-hide'];
        keywords.push(text);
      }

      const payload = {
        ['keywords-hide']: keywords,
      };

      chrome.storage.sync.set(payload, () => {
        resolve();
      });
    });
  });
}

function removeKeywordHide(text) {

  return new Promise((resolve) => {
    chrome.storage.sync.get('keywords-hide', (result) => {
      // Result is empty in Firefox using temporary add-on id.
      let keywords;
      if (!result || !result['keywords-hide']) {
        keywords = [];
      } else {
        keywords = result['keywords-hide'];
        keywords = keywords.filter(key => key !== text);
      }

      const payload = {
        ['keywords-hide']: keywords,
      };

      chrome.storage.sync.set(payload, () => {
        resolve();
      });
    });
  });
}

function getKeywordsHide() {

  return new Promise((resolve) => {
    chrome.storage.sync.get('keywords-hide', (result) => {
      // Result is empty in Firefox using temporary add-on id.
      let keywords;
      if (!result || !result['keywords-hide']) {
        keywords = [];
      } else {
        keywords = result['keywords-hide'];
      }

      resolve(keywords);
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
  } else if (type === 'IS_DISABLED_IMAGE_HIDE') {
    getDisabledImageHideStatus()
    .then(disabled => {
      sendResponse({
        disabled,
      });
    });
    return true;
  } else if (type === 'UPDATE_DISABLED_IMAGE_HIDE') {
    const disabling = request.disabling;
    disableImageHide(disabling)
    .then(() => {
      sendResponse({
        status: 'success',
      });
    });
    return true;
  } else if (type === 'IS_DISABLED_VIDEO_HIDE') {
    getDisabledVideoHideStatus()
    .then(disabled => {
      sendResponse({
        disabled,
      });
    });
    return true;
  } else if (type === 'UPDATE_DISABLED_VIDEO_HIDE') {
    const disabling = request.disabling;
    disableVideoHide(disabling)
    .then(() => {
      sendResponse({
        status: 'success',
      });
    });
    return true;
  } else if (type === 'IS_DISABLED_LINK_HIDE') {
    getDisabledLinkHideStatus()
    .then(disabled => {
      sendResponse({
        disabled,
      });
    });
    return true;
  } else if (type === 'UPDATE_DISABLED_LINK_HIDE') {
    const disabling = request.disabling;
    disableLinkHide(disabling)
    .then(() => {
      sendResponse({
        status: 'success',
      });
    });
    return true;
  } else if (type === 'IS_DISABLED_DOCUMENT_HIDE') {
    getDisabledDocumentHideStatus()
    .then(disabled => {
      sendResponse({
        disabled,
      });
    });
    return true;
  } else if (type === 'UPDATE_DISABLED_DOCUMENT_HIDE') {
    const disabling = request.disabling;
    disableDocumentHide(disabling)
    .then(() => {
      sendResponse({
        status: 'success',
      });
    });
    return true;
  } else if (type === 'IS_DISABLED_PROMOTION_HIDE') {
    getDisabledPromotionHideStatus()
    .then(disabled => {
      sendResponse({
        disabled,
      });
    });
    return true;
  } else if (type === 'UPDATE_DISABLED_PROMOTION_HIDE') {
    const disabling = request.disabling;
    disablePromotionHide(disabling)
    .then(() => {
      sendResponse({
        status: 'success',
      });
    });
    return true;
  } else if (type === 'IS_DISABLED_DISTRACTIONS') {
    getDisabledDistractionsHideStatus()
    .then(disabled => {
      sendResponse({
        disabled,
      });
    });
    return true;
  } else if (type === 'UPDATE_DISABLED_DISTRACTIONS') {
    const disabling = request.disabling;
    disableDistractions(disabling)
    .then(() => {
      sendResponse({
        status: 'success',
      });
    });
    return true;
  } else if (type === 'IS_DISABLED_ACTIVITIY_HIDE') {
    getDisabledActivityHideStatus()
    .then(disabled => {
      sendResponse({
        disabled,
      });
    });
    return true;
  } else if (type === 'UPDATE_DISABLED_ACTIVITIES') {
    const disabling = request.disabling;
    disableActivities(disabling)
    .then(() => {
      sendResponse({
        status: 'success',
      });
    });
    return true;
  } else if (type === 'ADD_KEYWORD_HIDE') {
    const text = request.text;
    addKeywordHide(text)
    .then(() => {
      sendResponse({
        status: 'success',
      });
    });
    return true;
  } else if (type === 'REMOVE_KEYWORD_HIDE') {
    const text = request.text;
    removeKeywordHide(text)
    .then(() => {
      sendResponse({
        status: 'success',
      });
    });
    return true;
  } else if (type === 'GET_KEYWORDS_HIDE') {
    const text = request.text;
    getKeywordsHide(text)
    .then(keywords => {
      sendResponse({
        keywords,
      });
    });
    return true;
  }
});
