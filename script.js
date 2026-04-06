// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Hamburger menu ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  navbar.classList.toggle('menu-open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    navbar.classList.remove('menu-open');
  });
});

// ── Scroll animations ──
const animatedEls = document.querySelectorAll(
  '.card, .step, .testimonial-card, .section-title, .section-subtitle, .section-tag, .hero-badge, .benefits-list li'
);

animatedEls.forEach(el => el.classList.add('fade-in-up'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

animatedEls.forEach(el => observer.observe(el));

// ── Stagger card animations ──
document.querySelectorAll('.cards-grid, .steps, .testimonial-grid, .benefits-list').forEach(container => {
  container.querySelectorAll('.card, .step, .testimonial-card, li').forEach((child, i) => {
    child.style.transitionDelay = `${i * 80}ms`;
  });
});

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}`
          ? 'var(--green-600)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
