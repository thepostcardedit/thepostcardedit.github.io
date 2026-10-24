(async function () {
  const container = document.getElementById('random-posts');

  if (!container) return;

  try {
    const response = await fetch('/blog.html');
    if (!response.ok) {
      throw new Error('Could not load /blog.html');
    }

    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const currentPath = window.location.pathname.replace(/\/$/, '');

    const posts = Array.from(doc.querySelectorAll('.blog-card'))
      .filter(post => {
        const href = post.getAttribute('href');
        if (!href) return false;

        const postUrl = new URL(href, window.location.origin + '/blog.html');
        return postUrl.pathname.replace(/\/$/, '') !== currentPath;
      });

    // Shuffle the posts randomly.
    for (let i = posts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [posts[i], posts[j]] = [posts[j], posts[i]];
    }

    // Display up to three cards.
    posts.slice(0, 3).forEach(post => {
      const card = post.cloneNode(true);
      const href = card.getAttribute('href');

      if (href) {
        card.href = new URL(href, window.location.origin + '/blog.html').href;
      }

      container.appendChild(card);
    });
  } catch (error) {
    console.error('Random blog posts could not be loaded:', error);
  }
})();
