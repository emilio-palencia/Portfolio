//theme
const themeToggle = document.getElementById('themeToggle');
const html        = document.documentElement;

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
}

function getInitialTheme() {
  const saved = localStorage.getItem('portfolio-theme');
  if (saved === 'dark' || saved === 'light') return saved;
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
}

applyTheme(getInitialTheme());

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('portfolio-theme')) {
    applyTheme(e.matches ? 'dark' : 'light');
  }
});

//navigation bar scroll effect
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll();

//fade animation
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  }
);

document.querySelectorAll('.fade-up').forEach((el) => fadeObserver.observe(el));