// ===== Mobile menu =====
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');

function setMenu(open) {
  if (!menuToggle || !navbar) return;
  navbar.classList.toggle('active', open);
  menuToggle.classList.toggle('active', open);
  menuToggle.setAttribute('aria-expanded', String(open));
}

menuToggle?.addEventListener('click', () => {
  const isOpen = navbar?.classList.contains('active');
  setMenu(!isOpen);
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => setMenu(false));
});

// ===== Scroll to top =====
const scrollToTopBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) scrollToTopBtn?.classList.add('show');
  else scrollToTopBtn?.classList.remove('show');
});

scrollToTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Active nav link on scroll =====
const sections = [...document.querySelectorAll('section[id]')];
const navLinks = [...document.querySelectorAll('.nav-link')];

function onScrollSpy() {
  const y = window.scrollY + 120;
  let currentId = 'top';

  for (const s of sections) {
    if (s.offsetTop <= y) currentId = s.id;
  }

  navLinks.forEach(a => {
    const href = a.getAttribute('href') || '';
    a.classList.toggle('is-active', href === `#${currentId}`);
  });
}

window.addEventListener('scroll', onScrollSpy);
onScrollSpy();

// ===== Contact form => mailto (no backend) =====
const form = document.getElementById('contactForm');

form?.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = (document.getElementById('name')?.value || '').trim();
  const email = (document.getElementById('email')?.value || '').trim();
  const subject = (document.getElementById('subject')?.value || '').trim();
  const message = (document.getElementById('message')?.value || '').trim();

  const fullSubject = encodeURIComponent(subject || 'Contact Portfolio');
  const body = encodeURIComponent(
`Bonjour Jibril,\n\n${message}\n\n---\nNom: ${name}\nEmail: ${email}\n`
  );

  window.location.href = `mailto:jibril.khattaf@icloud.com?subject=${fullSubject}&body=${body}`;
});
