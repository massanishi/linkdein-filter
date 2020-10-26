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
      console.log('hiding ', feed[i]);
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
      console.log('hiding ', feed[i]);
      feed[i].style = 'display:none;'
    }
  }
}

// Hadle post type for links.

// feed-shared-article


// Hadle post with text content.

// feed-shared-text

// Hadle post with user type (companies vs people).

// Remove promotion

function addObserver() {
  // Add listener for the wrapper and listen for a chnage.
  const allH1 = document.getElementsByTagName('h1');

  // It will contain logo as h1 in navbar. Remove.
  let feedH1;
  // const feedH1 = allH1.fliter(h1 => !h1.attribs.class.includes('global-nav__branding'))[0];
  for (var i = 0; i < allH1.length; i++) {
    if (!allH1[i].className.includes('global-nav__branding')) {
      feedH1 = allH1[i];
    }
  }

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
  console.log('parent', parent);
}

function init() {
  feed = document.getElementsByClassName('feed-shared-update-v2');
  if (feed.length === 0) {
    throw new Error('no feed with feed-shared-update-v2 class initially found');
  }
  console.log('INITIAL feed.length', feed.length);
  hideImagePost(feed);
  hideVideoPost(feed);

  addObserver();
}

init();