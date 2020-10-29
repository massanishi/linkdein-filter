function isDisabled() {
  const data = {
    type: 'IS_DISABLED',
  };
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(data, resp => {
      const disabled = resp.disabled;

      resolve(disabled);
    });
  });
}

function disable(evt) {
  const disabling = !evt.target.checked;

  const data = {
    type: 'UPDATE_DISABLED',
    disabling,
  };
  chrome.runtime.sendMessage(data, () => {
    chrome.tabs.reload();
  });
}

function isDisabledImage() {
  const data = {
    type: 'IS_DISABLED_IMAGE_HIDE',
  };
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(data, resp => {
      const disabled = resp.disabled;

      resolve(disabled);
    });
  });
}

function disableImageHide(evt) {
  const disabling = !evt.target.checked;

  const data = {
    type: 'UPDATE_DISABLED_IMAGE_HIDE',
    disabling,
  };
  chrome.runtime.sendMessage(data, () => {
    chrome.tabs.reload();
  });
}

function isDisabledVideo() {
  const data = {
    type: 'IS_DISABLED_VIDEO_HIDE',
  };
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(data, resp => {
      const disabled = resp.disabled;

      resolve(disabled);
    });
  });
}

function disableVideoHide(evt) {
  const disabling = !evt.target.checked;

  const data = {
    type: 'UPDATE_DISABLED_VIDEO_HIDE',
    disabling,
  };
  chrome.runtime.sendMessage(data, () => {
    chrome.tabs.reload();
  });
}

function isDisabledLink() {
  const data = {
    type: 'IS_DISABLED_LINK_HIDE',
  };
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(data, resp => {
      const disabled = resp.disabled;

      resolve(disabled);
    });
  });
}

function disableLinkHide(evt) {
  const disabling = !evt.target.checked;

  const data = {
    type: 'UPDATE_DISABLED_LINK_HIDE',
    disabling,
  };
  chrome.runtime.sendMessage(data, () => {
    chrome.tabs.reload();
  });
}

function isDisabledDocument() {
  const data = {
    type: 'IS_DISABLED_DOCUMENT_HIDE',
  };
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(data, resp => {
      const disabled = resp.disabled;

      resolve(disabled);
    });
  });
}

function disableDocumentHide(evt) {
  const disabling = !evt.target.checked;

  const data = {
    type: 'UPDATE_DISABLED_DOCUMENT_HIDE',
    disabling,
  };
  chrome.runtime.sendMessage(data, () => {
    chrome.tabs.reload();
  });
}

function isDisabledPromotion() {
  const data = {
    type: 'IS_DISABLED_PROMOTION_HIDE',
  };
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(data, resp => {
      const disabled = resp.disabled;

      resolve(disabled);
    });
  });
}

function disablePromotionHide(evt) {
  const disabling = !evt.target.checked;

  const data = {
    type: 'UPDATE_DISABLED_PROMOTION_HIDE',
    disabling,
  };
  chrome.runtime.sendMessage(data, () => {
    chrome.tabs.reload();
  });
}

// disabled switch
const onOffSwitch = document.getElementById('turn-onoff-switch');
onOffSwitch.addEventListener('change', disable);

isDisabled()
.then(disabled => {
  onOffSwitch.checked = !disabled;
});

const imageHideSwitch = document.getElementById('image-hide-switch');
imageHideSwitch.addEventListener('change', disableImageHide);

isDisabledImage()
.then(disabled => {
  imageHideSwitch.checked = !disabled;
});

const videoHideSwitch = document.getElementById('video-hide-switch');
videoHideSwitch.addEventListener('change', disableVideoHide);

isDisabledVideo()
.then(disabled => {
  videoHideSwitch.checked = !disabled;
});

const linkHideSwitch = document.getElementById('link-hide-switch');
linkHideSwitch.addEventListener('change', disableLinkHide);

isDisabledLink()
.then(disabled => {
  linkHideSwitch.checked = !disabled;
});

const documentHideSwitch = document.getElementById('document-hide-switch');
documentHideSwitch.addEventListener('change', disableDocumentHide);

isDisabledDocument()
.then(disabled => {
  documentHideSwitch.checked = !disabled;
});


const promotionHideSwitch = document.getElementById('promotion-hide-switch');
promotionHideSwitch.addEventListener('change', disablePromotionHide);

isDisabledPromotion()
.then(disabled => {
  promotionHideSwitch.checked = !disabled;
});
