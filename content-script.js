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

    if (feed[i].attribs === 'display-none') {
      continue;
    }

    if (feed[i].getElementsByClassName('feed-shared-image').length > 0) {
      feed[i].style = 'display:none;';
      feed[i].attribs = 'display-none;';
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

    if (feed[i].attribs === 'display-none') {
      continue;
    }

    if (feed[i].getElementsByClassName('feed-shared-linkedin-video').length > 0) {
      feed[i].style = 'display:none;';
      feed[i].attribs = 'display-none;';
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

    if (feed[i].attribs === 'display-none') {
      continue;
    }

    if (feed[i].getElementsByClassName('feed-shared-article').length > 0) {
      feed[i].style = 'display:none;';
      feed[i].attribs = 'display-none;';
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

    if (feed[i].attribs === 'display-none') {
      continue;
    }

    if (feed[i].getElementsByClassName('feed-shared-document').length > 0) {
      feed[i].style = 'display:none;';
      feed[i].attribs = 'display-none;';
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

    if (feed[i].attribs === 'display-none') {
      continue;
    }
    // COMMENT: This is a bug. actor class is everywhere.
    // if (feed[i].getElementsByClassName('feed-shared-actor').length > 0) {
    //   feed[i].style = 'display:none;';
    //   feed[i].attribs = 'display-none;';
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

    if (feed[i].attribs === 'display-none') {
      continue;
    }

    if (feed[i].getElementsByClassName('feed-shared-text').length > 0) {
      feed[i].style = 'display:none;';
      feed[i].attribs = 'display-none;';
    }
  }
}

// Hnadle post with specific text keyword.
function hideKeywordPost(feed, keyword) {
  if (!feed) return;

  // Make it case insensitive.
  const regex = new RegExp(keyword, "i");

  for (var i = 0; i < feed.length; i++) {
    if (!feed[i].children || feed[i].children.length === 0) {
      continue;
    }

    if (feed[i].attribs === 'display-none') {
      continue;
    }

    const description = feed[i].getElementsByClassName('feed-shared-update-v2__description-wrapper')[0];

    if (description) {
      const sharedKeyword = regex.test(description.innerHTML);

      feed[i].style = 'display:none;';
      feed[i].attribs = 'display-none;';
    }
  }
}

// TODO: Hadle post with user type (companies vs people).

// Hnadle post with promotion.
function hidePromotionPost(feed) {
  if (!feed) return;

  for (var i = 0; i < feed.length; i++) {
    if (!feed[i].children || feed[i].children.length === 0) {
      continue;
    }

    if (feed[i].attribs === 'display-none') {
      continue;
    }

    const subDescription = feed[i].getElementsByClassName('feed-shared-actor__sub-description')[0];
    if (subDescription) {
      if (subDescription.innerHTML.includes('Promoted')) {
        feed[i].style = 'display:none;';
        feed[i].attribs = 'display-none;';
      }
    }
  }
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

        hideImagePost(feed);
        hideVideoPost(feed);
        // hideLinkPost(feed);
        hideDocumentPost(feed);
        hideActionPost(feed);
        // hideKeywordPost(feed, 'http');
        hidePromotionPost(feed);

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
  feed = document.getElementsByClassName('feed-shared-update-v2');
  if (feed.length === 0) {
    return;
  }

  hideImagePost(feed);
  hideVideoPost(feed);
  // hideLinkPost(feed);
  hideDocumentPost(feed);
  hideActionPost(feed);
  // hideKeywordPost(feed, 'http');
  hidePromotionPost(feed);

  addObserver();
}

init();

// Linkedin is a single app and content script does not get reloaded when navigating pages.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'PAGE_RELOADED') {
      init();
    }
});
