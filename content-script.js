// 1. Get all objects of feed
// 2. Find the nested content
// 3. Check against the setting and hide.

// A list of post.
let feed;

// Hadle post type for image.
function hideImagePost(feed) {
  if (!feed) return;

  for (var i = 0; i < feed.length; i++) {
    if (!feed[i].children || feed[i].children.length === 0) {
      continue;
    }

    if (feed[i].attribs === 'nodisplay') {
      continue;
    }

    if (feed[i].getElementsByClassName('feed-shared-image').length > 0) {
      feed[i].style = 'display:none;';
      feed[i].setAttribute('nodisplay', '');
    }
  }
}


// Hadle post type for video.
function hideVideoPost(feed) {
  if (!feed) return;

  for (var i = 0; i < feed.length; i++) {
    if (!feed[i].children || feed[i].children.length === 0) {
      continue;
    }

    if (feed[i].attribs === 'nodisplay') {
      continue;
    }

    if (feed[i].getElementsByClassName('feed-shared-linkedin-video').length > 0) {
      feed[i].style = 'display:none;';
      feed[i].setAttribute('nodisplay', '');
    }
  }
}

// Hadle post type for links.
function hideLinkPost(feed) {
  if (!feed) return;

  for (var i = 0; i < feed.length; i++) {
    if (!feed[i].children || feed[i].children.length === 0) {
      continue;
    }

    if (feed[i].attribs === 'nodisplay') {
      continue;
    }

    if (feed[i].getElementsByClassName('feed-shared-article').length > 0) {
      feed[i].style = 'display:none;';
      feed[i].setAttribute('nodisplay', '');
    }
  }
}

// Hide document like a slide.
function hideDocumentPost(feed) {
  if (!feed) return;

  for (var i = 0; i < feed.length; i++) {
    if (!feed[i].children || feed[i].children.length === 0) {
      continue;
    }

    if (feed[i].attribs === 'nodisplay') {
      continue;
    }

    if (feed[i].getElementsByClassName('feed-shared-document').length > 0) {
      feed[i].style = 'display:none;';
      feed[i].setAttribute('nodisplay', '');
    }
  }
}

// hide action. Q&A stuff.
function hideActionPost(feed) {
  if (!feed) return;

  for (var i = 0; i < feed.length; i++) {
    if (!feed[i].children || feed[i].children.length === 0) {
      continue;
    }

    if (feed[i].attribs === 'nodisplay') {
      continue;
    }
    // COMMENT: This is a bug. actor class is everywhere.
    // if (feed[i].getElementsByClassName('feed-shared-poll').length > 0) {
    //   feed[i].style = 'display:none;';
    //   feed[i].nodisplay('nodisplay', '');
    // }
  }
}

// Hadle post with text content.
function hideTextPost(feed) {
  if (!feed) return;

  for (var i = 0; i < feed.length; i++) {
    if (!feed[i].children || feed[i].children.length === 0) {
      continue;
    }

    if (feed[i].attribs === 'nodisplay') {
      continue;
    }

    if (feed[i].getElementsByClassName('feed-shared-text').length > 0) {
      feed[i].style = 'display:none;';
      feed[i].setAttribute('nodisplay', '');
    }
  }
}

// Hnadle post with specific text keyword.
function hideKeywordPost(feed, keywords) {
  if (!feed) return;

  // Make it case insensitive.
  const regex = new RegExp(keywords.join('|'), "i");

  for (var i = 0; i < feed.length; i++) {
    if (!feed[i].children || feed[i].children.length === 0) {
      continue;
    }

    if (feed[i].attribs === 'nodisplay') {
      continue;
    }

    const description = feed[i].getElementsByClassName('feed-shared-update-v2__description-wrapper')[0];

    if (description) {
      const sharedKeyword = regex.test(description.innerText);

      if (sharedKeyword) {
        feed[i].style = 'display:none;';
        feed[i].setAttribute('nodisplay', '');
      }
    }
  }
}

// Hadle post with companies. feed-shared-actor__description contains 'followers'

// Hnadle post with promotion.
function hidePromotionPost(feed) {
  if (!feed) return;

  for (var i = 0; i < feed.length; i++) {
    if (!feed[i].children || feed[i].children.length === 0) {
      continue;
    }

    if (feed[i].attribs === 'nodisplay') {
      continue;
    }

    const subDescription = feed[i].getElementsByClassName('feed-shared-actor__sub-description')[0];
    if (subDescription) {
      if (subDescription.innerHTML.includes('Promoted')) {
        feed[i].style = 'display:none;';
        feed[i].setAttribute('nodisplay', '');
      }
    }
  }
}

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

function loadKeywords() {
  const data = {
    type: 'GET_KEYWORDS_HIDE'
  };

  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(data, resp => {
      const keywords = resp.keywords;

      resolve(keywords);
    });
  });
}

function handleImagePost(feed) {
  return isDisabledImage()
  .then(disabled => {
    if (disabled) return;

    hideImagePost(feed);
  });
}

function handleVideoPost(feed) {
  return isDisabledVideo()
  .then(disabled => {
    if (disabled) return;

    hideVideoPost(feed);
  });
}

function handleLinkPost(feed) {
  return isDisabledLink()
  .then(disabled => {
    if (disabled) return;

    hideLinkPost(feed);
  });
}

function handleDocumentPost(feed) {
  return isDisabledDocument()
  .then(disabled => {
    if (disabled) return;

    hideDocumentPost(feed);
  });
}

function handlePromotionPost(feed) {
  return isDisabledPromotion()
  .then(disabled => {
    if (disabled) return;

    hidePromotionPost(feed);
  });
}

let keywordsToHide;
function handleKeywords(feed) {
  let p;
  if (!keywordsToHide) {
    p = loadKeywords();
  } else {
    p = Promise.resolve(keywordsToHide);
  }

  p.then(keywords => {
    keywordsToHide = keywords;
    if (keywordsToHide.length === 0) return;

    hideKeywordPost(feed, keywords);
  });
}

function addObserver() {
  // Add listener for the wrapper and listen for a chnage.
  const allH1 = document.getElementsByTagName('h1');

  // It will contain logo as h1 in navbar. Remove.
  let feedH1;
  for (var i = 0; i < allH1.length; i++) {
    if (!allH1[i].className.includes('global-nav__branding')) {
      feedH1 = allH1[i];
    }
  }

  let parent;
  if (feedH1) {
    parent = feedH1.parentElement;
  } else {
    // if no header is there, check if this is the search result feed.
    parent  = document.getElementsByClassName('search-results__list')[0];
  }

  if (!parent) return;

  let timer;
  // feed pointer gets updated automatically along with the element. Keep the previous length in cache.
  let feedPrevLength;
  const mutationObserver = new MutationObserver(e =>  {
    // e is a list of mutation record. Each contains
    // Save computation. This observation with subtree will get called often.
    if (feed && e.length < feed.length) {
      return;
    }

    timer = new Date();
    const gapTime = 500;
    const setFeed = () => {
      // Wait for some time. This mutation observer might get called repeatedly.
      if ((new Date().getTime() - timer.getTime()) < gapTime) {
        setTimeout(setFeed, gapTime);
        return;
      }

      feed = document.getElementsByClassName('feed-shared-update-v2');
      if (feedPrevLength !== feed.length) {

        handleImagePost(feed);
        handleVideoPost(feed);
        handleLinkPost(feed);
        handleDocumentPost(feed);
        handlePromotionPost(feed);

        handleKeywords(feed);

        // hideActionPost(feed);

        feedPrevLength = feed.length;
      }

    }
    setTimeout(setFeed, gapTime);
  });

  // LinkedIn insert the about 10-20 div placeholders first even though inside the element (the part about feed-shared-update-v2) is never inserted unless you scroll enough.
  // Structure:
  // ember-view > relative ember-view > feed-shared-update-v2
  // That is why feed-shared-update-v2 does not catch all div afterwards and the shallow mutation observer does not catch them either.
  mutationObserver.observe(parent, { childList: true, subtree: true });
}

function init() {
  // Check for disabled status
  return isDisabled()
  .then(disabled => {
    if (disabled) return;

    feed = document.getElementsByClassName('feed-shared-update-v2');
    if (feed.length === 0) {
      return;
    }

    // Handle posts according to each settings.
    handleImagePost(feed);
    handleVideoPost(feed);
    handleLinkPost(feed);
    handleDocumentPost(feed);
    handlePromotionPost(feed);

    handleKeywords(feed);

    // NOTE: Action not working.
    // hideActionPost(feed);

    addObserver();
  });
}

init();

// Linkedin is a single app and content script does not get reloaded when navigating pages.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'PAGE_RELOADED') {
      init();
    }
});
