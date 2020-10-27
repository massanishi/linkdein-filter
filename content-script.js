// 1. Get all objects of feed
// 2. Find the nested content
// 3. Check against the setting and hide.

// A list of post.
let feed;

// Hadle post type for image.
function hideImagePost(feed) {
  if (!feed) return;

  console.log('hiding image post');

  for (var i = 0; i < feed.length; i++) {
    // Raw method. It will be more memory efficient if the child is detected more directly.
    const sharedImage = feed[i].innerHTML.includes('feed-shared-image');

    if (sharedImage) {
      feed[i].style = 'display:none;'
    }
  }
}


// Hadle post type for video.
function hideVideoPost(feed) {
  if (!feed) return;

  console.log('hiding video post');

  for (var i = 0; i < feed.length; i++) {
    const sharedVideo = feed[i].innerHTML.includes('feed-shared-linkedin-video');

    if (sharedVideo) {
      feed[i].style = 'display:none;'
    }
  }
}

// Hadle post type for links.
function hideLinkPost(feed) {
  if (!feed) return;

  console.log('hiding link post');

  for (var i = 0; i < feed.length; i++) {
    const sharedLink = feed[i].innerHTML.includes('feed-shared-article');

    if (sharedLink) {
      feed[i].style = 'display:none;'
    }
  }
}

// Hide document like a slide.
function hideDocumentPost(feed) {
  if (!feed) return;

  console.log('hiding document post');

  for (var i = 0; i < feed.length; i++) {
    const sharedDocument = feed[i].innerHTML.includes('feed-shared-document');

    if (sharedDocument) {
      feed[i].style = 'display:none;'
    }
  }
}

// hide action. Q&A stuff.
function hideActionPost() {
  if (!feed) return;

  console.log('hiding document post');

  for (var i = 0; i < feed.length; i++) {
    const sharedAction = feed[i].innerHTML.includes('feed-shared-actor');

    if (sharedAction) {
      feed[i].style = 'display:none;'
    }
  }
}

// Hadle post with text content.
function hideTextPost() {
  if (!feed) return;

  console.log('hiding text post');

  for (var i = 0; i < feed.length; i++) {
    const sharedText = feed[i].innerHTML.includes('feed-shared-text');

    if (sharedText) {
      feed[i].style = 'display:none;'
    }
  }
}

// Hnadle post with specific text keyword.
function hideKeywordPost(keyword) {
  if (!feed) return;

  console.log('hiding keyword post');

  // Make it case insensitive.
  const regex = new RegExp(keyword, "i");

  for (var i = 0; i < feed.length; i++) {
    const sharedKeyword = regex.test(feed[i].innerHTML);

    if (sharedKeyword) {
      feed[i].style = 'display:none;'
    }
  }
}

// Hadle post with user type (companies vs people).

// Remove promotion

function addObserver() {
  // Add listener for the wrapper and listen for a chnage.
  const allH1 = document.getElementsByTagName('h1');
  console.log('addingObserver');

  // It will contain logo as h1 in navbar. Remove.
  let feedH1;
  // const feedH1 = allH1.fliter(h1 => !h1.attribs.class.includes('global-nav__branding'))[0];
  for (var i = 0; i < allH1.length; i++) {
    if (!allH1[i].className.includes('global-nav__branding')) {
      feedH1 = allH1[i];
    }
  }

  console.log('feedH1', feedH1);
  if (!feedH1) {
    console.error('Failed to find header element to observe');
    return;
  }

  const parent = feedH1.parentElement;

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
        hideLinkPost(feed);
        hideDocumentPost(feed);
        hideActionPost(feed);
        hideKeywordPost('http');

        feedPrevLength = feed.length;
      }

      console.log('INSIDE feed.length', feed.length);
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
  hideLinkPost(feed);
  hideDocumentPost(feed);
  hideActionPost(feed);
  hideKeywordPost('http');

  addObserver();
}

init();

// Linkedin is a single app and content script does not get reloaded when navigating pages.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'PAGE_RELOADED') {
      init();
    }
});
