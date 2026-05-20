// Interactivitate minimă: meniu mobil, temă, filtrare discipline, progres lectură.
(function () {
  const root = document.documentElement;
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark') root.classList.add('dark');

  const themeToggle = document.querySelector('[data-theme-toggle]');
  if (themeToggle) {
    const updateThemeLabel = () => {
      themeToggle.setAttribute('aria-label', root.classList.contains('dark') ? 'Comută pe tema luminoasă' : 'Comută pe tema întunecată');
      themeToggle.textContent = root.classList.contains('dark') ? '☀️' : '🌙';
    };
    updateThemeLabel();
    themeToggle.addEventListener('click', () => {
      root.classList.toggle('dark');
      localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
      updateThemeLabel();
    });
  }

  const menuButton = document.querySelector('[data-menu-button]');
  const nav = document.querySelector('[data-nav]');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav] a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === current) link.classList.add('active');
  });

  const progress = document.querySelector('[data-progress]');
  const updateProgress = () => {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    progress.style.width = pct + '%';
  };
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);

  const filterButtons = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-discipline]');
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((btn) => btn.setAttribute('aria-pressed', String(btn === button)));
      cards.forEach((card) => {
        const match = filter === 'toate' || card.dataset.discipline === filter;
        card.classList.toggle('hidden-card', !match);
      });
    });
  });

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
