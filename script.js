// Hamburger menu toggle logic
const hamburger = document.querySelector('.hamburger');
const navDrawer = document.querySelector('.nav-drawer');

if (hamburger && navDrawer) {
  const navLinks = navDrawer.querySelectorAll('a');

  const toggleMenu = () => {
    const isOpen = hamburger.classList.toggle('is-open');
    navDrawer.classList.toggle('is-open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  };

  hamburger.addEventListener('click', toggleMenu);
  navLinks.forEach((link) => link.addEventListener('click', () => {
    if (hamburger.classList.contains('is-open')) {
      toggleMenu();
    }
  }));
}

// Scroll reveal for sections
const revealItems = document.querySelectorAll('.reveal');

if (revealItems.length) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((el) => observer.observe(el));
}
