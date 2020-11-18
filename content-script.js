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

    if (feed[i].attribs === 'nodisplay' || feed[i].attribs === 'imagefilterchecked') {
      continue;
    }

    // TODO: Need to hide .artdeco-card for multiple image share.
    if (feed[i].getElementsByClassName('feed-shared-image').length > 0) {
      feed[i].style = 'display:none;';
      feed[i].setAttribute('nodisplay', '');
    } else {
      feed[i].setAttribute('imagefilterchecked', '');
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

    if (feed[i].attribs === 'nodisplay' || feed[i].attribs === 'videofilterchecked') {
      continue;
    }

    if (feed[i].getElementsByClassName('feed-shared-linkedin-video').length > 0) {
      feed[i].style = 'display:none;';
      feed[i].setAttribute('nodisplay', '');
    } else {
      feed[i].setAttribute('videofilterchecked', '');
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

    if (feed[i].attribs === 'nodisplay' || feed[i].attribs === 'linkfilterchecked') {
      continue;
    }

    if (feed[i].getElementsByClassName('feed-shared-article').length > 0) {
      feed[i].style = 'display:none;';
      feed[i].setAttribute('nodisplay', '');
    } else {
      feed[i].setAttribute('linkfilterchecked', '');
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

    if (feed[i].attribs === 'nodisplay' || feed[i].attribs === 'documentfilterchecked') {
      continue;
    }

    if (feed[i].getElementsByClassName('feed-shared-document').length > 0) {
      feed[i].style = 'display:none;';
      feed[i].setAttribute('nodisplay', '');
    } else {
      feed[i].setAttribute('documentfilterchecked', '');
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

    if (feed[i].attribs === 'nodisplay' || feed[i].attribs === 'actionfilterchecked') {
      continue;
    }

    if (feed[i].getElementsByClassName('feed-shared-poll').length > 0) {
      feed[i].style = 'display:none;';
      feed[i].nodisplay('nodisplay', '');
    } else {
      feed[i].setAttribute('actionfilterchecked', '');
    }
  }
}

// Hadle post with text content.
function hideTextPost(feed) {
  if (!feed) return;

  for (var i = 0; i < feed.length; i++) {
    if (!feed[i].children || feed[i].children.length === 0) {
      continue;
    }

    if (feed[i].attribs === 'nodisplay' || feed[i].attribs === 'textfilterchecked') {
      continue;
    }

    if (feed[i].getElementsByClassName('feed-shared-text').length > 0) {
      feed[i].style = 'display:none;';
      feed[i].setAttribute('nodisplay', '');
    } else {
      feed[i].setAttribute('textfilterchecked', '');
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

    if (feed[i].attribs === 'nodisplay' || feed[i].attribs === 'keywordfilterchecked') {
      continue;
    }

    const description = feed[i].getElementsByClassName('feed-shared-update-v2__description-wrapper')[0];

    if (!description) {
      feed[i].setAttribute('keywordfilterchecked', '');
      continue;
    }

    const sharedKeyword = regex.test(description.innerText);

    if (sharedKeyword) {
      feed[i].style = 'display:none;';
      feed[i].setAttribute('nodisplay', '');
    } else {
      feed[i].setAttribute('keywordfilterchecked', '');
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

    if (feed[i].attribs === 'nodisplay' || feed[i].attribs === 'promotionfilterchecked') {
      continue;
    }

    const subDescription = feed[i].getElementsByClassName('feed-shared-actor__sub-description')[0];
    if (!subDescription) {
      feed[i].setAttribute('promotionfilterchecked', '');
      continue;
    }

    if (subDescription.innerHTML.includes('Promoted')) {
      feed[i].style = 'display:none;';
      feed[i].setAttribute('nodisplay', '');
    } else {
      feed[i].setAttribute('promotionfilterchecked', '');
    }
  }
}

// Handle all posts in feed.
function hideAll(feed) {
  if (!feed) return;

  for (var i = 0; i < feed.length; i++) {
    if (!feed[i].children || feed[i].children.length === 0) {
      continue;
    }

    if (feed[i].attribs === 'nodisplay') {
      continue;
    }

    // NOTE: Use visibility hidden instead of display none here. Hiding all posts trigger load more posts easily. That continuous page update will slow down the site.
    feed[i].style = 'visibility:hidden;';
    feed[i].setAttribute('nodisplay', '');
  }
}

function hidePromotions() {
  const promotions = document.getElementsByClassName('ad-banner-container');

  if (promotions.length === 0) return;

  for (var i = 0; i < promotions.length; i++) {
    if (!promotions[i].children || promotions[i].children.length === 0) {
      continue;
    }

    if (promotions[i].attribs === 'nodisplay') {
      continue;
    }

    // NOTE: Hide instead of display none. It's more aesthetically pleasant to keep the layout.
    promotions[i].style = 'visibility:hidden;';
    promotions[i].setAttribute('nodisplay', '');
  }
}

function hideNews() {
  const news = document.getElementsByClassName('news-module');

  if (news.length === 0) return;

  for (var i = 0; i < news.length; i++) {
    if (!news[i].children || news[i].children.length === 0) {
      continue;
    }

    if (news[i].attribs === 'nodisplay') {
      continue;
    }

    // NOTE: Hide instead of display none. It's more aesthetically pleasant to keep the layout.
    news[i].style = 'visibility:hidden;';
    news[i].setAttribute('nodisplay', '');

    // NOTE: News has a parent wrapper that would show white. Hide that as well.
    news[i].parentElement.style = 'visibility:hidden;';
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

function isDisabledDistractions() {
  const data = {
    type: 'IS_DISABLED_DISTRACTIONS',
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

function handleDistractions(feed) {
  return isDisabledDistractions()
  .then(disabled => {
    if (disabled) return;

    hideAll(feed);
    hidePromotions();
    hideNews();
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
        handleDistractions(feed);

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
    handleDistractions(feed)

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
