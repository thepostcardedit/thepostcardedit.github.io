(() => {
  const mount = document.getElementById('site-header');
  if (!mount) return;

  fetch('/includes/header.html')
    .then((response) => {
      if (!response.ok) throw new Error(`Header request failed: ${response.status}`);
      return response.text();
    })
    .then((html) => {
      mount.innerHTML = html;

      const toggle = mount.querySelector('.site-nav__toggle');
      const nav = mount.querySelector('.site-nav');
      if (!toggle || !nav) return;

      toggle.addEventListener('click', () => {
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!isOpen));
        nav.classList.toggle('is-open', !isOpen);
      });

      nav.querySelectorAll('a').forEach((link) => {
        const target = new URL(link.href, window.location.origin);
        if (target.pathname === window.location.pathname && target.hash === window.location.hash) {
          link.setAttribute('aria-current', 'page');
        }
      });
    })
    .catch((error) => console.error('Could not load the shared site header.', error));
})();
