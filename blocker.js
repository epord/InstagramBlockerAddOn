////////////////////////////
/// Instagram Cleanup ///
////////////////////////////

const cleanupInstagram = () => {

  //////////////////////////////////////////////
  /// Stop scrolling past "You're caught up" ///
  //////////////////////////////////////////////
  const windowHeight = window.innerHeight;
  let caughtUpImg = null;

  document.querySelectorAll('img').forEach(img => {
    if (img.src && img.src.includes('illo-confirm-refresh')) {
      caughtUpImg = img;
    }
  });

  const rootElement = caughtUpImg?.parentElement?.parentElement?.parentElement;
  if (rootElement) {
    document.body.style.maxHeight = rootElement.offsetTop + 'px';

    if (
      rootElement.getBoundingClientRect().top <=
      windowHeight - rootElement.offsetHeight
    ) {
      window.scrollTo(
        0,
        rootElement.offsetTop - windowHeight + rootElement.offsetHeight
      );
    }
  }

  ////////////////////////////
  /// Hide sponsored posts ///
  ////////////////////////////
  const sponsoredWords = [
    'Sponsored',
    'Publicidad',
    'Sponsorisé',
    'Commandité',
    'Anzeige',
    'Sponsorizzato',
    'Patrocinado',
    'Sponsorowane'
  ];

  document.querySelectorAll('article').forEach(article => {
    const isSponsored = Array.from(
      article.querySelectorAll('span, div, a')
    ).some(el =>
      sponsoredWords.includes(el.textContent.trim())
    );

    if (isSponsored) {
      article.style.display = 'none';
    }
  });

  ////////////////////////////
  /// Hide Reels & Explore ///
  ////////////////////////////
  document.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    const isReels =
      href === '/reels/' || href.startsWith('/reels/?');

    const isExplore =
      href === '/explore/' || href.startsWith('/explore/?');

    // Hide ONLY main nav Reels / Explore (ignore footer, legal, locations, etc.)
    if ((isReels || isExplore) && !link.target) {
      const container = link.closest('div');
      (container || link).parentElement.parentElement.style.display = 'none';
    }
  });
};

// Initial run
cleanupInstagram();

// Keep blocking when Instagram re-renders (infinite scroll / React)
const observer = new MutationObserver(cleanupInstagram);
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Optional: also re-run on scroll (extra safety)
window.addEventListener('scroll', cleanupInstagram);