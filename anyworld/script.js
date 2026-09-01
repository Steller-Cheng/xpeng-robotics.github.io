(() => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const themeButton = document.querySelector('.theme-toggle');
  const themeGlyph = themeButton?.querySelector('span');

  function updateThemeGlyph() {
    if (themeGlyph) themeGlyph.textContent = root.dataset.theme === 'day' ? '☀' : '☾';
  }
  updateThemeGlyph();

  themeButton?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'day' ? 'night' : 'day';
    localStorage.setItem('anyworld-theme', root.dataset.theme);
    updateThemeGlyph();
  });

  const revealElements = document.querySelectorAll('.reveal');
  if (reduceMotion) {
    revealElements.forEach((el) => el.classList.add('visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    revealElements.forEach((el) => revealObserver.observe(el));
  }

  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      if (entry.isIntersecting && entry.intersectionRatio > 0.35) {
        const promise = video.play();
        if (promise?.catch) promise.catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { threshold: [0, .35, .75] });

  document.querySelectorAll('video[muted]').forEach((video) => {
    video.muted = true;
    if (!reduceMotion) videoObserver.observe(video);
  });

  const sectionLinks = [...document.querySelectorAll('.content-menu a')];
  const sectionMap = sectionLinks
    .map((link) => ({ link, section: document.querySelector(link.getAttribute('href')) }))
    .filter((item) => item.section);

  const navObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    sectionLinks.forEach((link) => link.classList.remove('active'));
    const active = sectionMap.find((item) => item.section === visible.target);
    active?.link.classList.add('active');
  }, { rootMargin: '-26% 0px -60% 0px', threshold: [0, .05, .25] });
  sectionMap.forEach(({ section }) => navObserver.observe(section));

  const dialog = document.querySelector('.video-dialog');
  const dialogVideo = dialog?.querySelector('video');
  const dialogCaption = dialog?.querySelector('p');
  const dialogClose = dialog?.querySelector('.dialog-close');

  document.querySelectorAll('figure video, .method-output video, .method-input video').forEach((video) => {
    video.addEventListener('click', () => {
      if (!dialog || !dialogVideo) return;
      const source = video.querySelector('source')?.src;
      if (!source) return;
      dialogVideo.src = source;
      dialogVideo.poster = video.poster || '';
      const caption = video.closest('figure')?.querySelector('figcaption')?.textContent?.trim() || 'AnyWorld result';
      if (dialogCaption) dialogCaption.textContent = caption;
      dialog.showModal();
      dialogVideo.play().catch(() => {});
    });
  });

  function closeDialog() {
    if (!dialog || !dialogVideo) return;
    dialogVideo.pause();
    dialogVideo.removeAttribute('src');
    dialogVideo.load();
    dialog.close();
  }
  dialogClose?.addEventListener('click', closeDialog);
  dialog?.addEventListener('click', (event) => {
    if (event.target === dialog) closeDialog();
  });
  dialog?.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeDialog();
  });

  document.querySelector('.copy-button')?.addEventListener('click', async (event) => {
    const button = event.currentTarget;
    try {
      await navigator.clipboard.writeText(button.dataset.copy || '');
      const original = button.textContent;
      button.textContent = 'Copied';
      setTimeout(() => { button.textContent = original; }, 1500);
    } catch {
      button.textContent = 'Copy failed';
    }
  });
})();
