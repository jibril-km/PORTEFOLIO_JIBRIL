const header = document.getElementById('header');
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');
const scrollToTopBtn = document.querySelector('.scroll-to-top');
const navLinks = [...document.querySelectorAll('.nav-link')];
const sections = [...document.querySelectorAll('section[id]')];
const revealEls = [...document.querySelectorAll('.reveal')];
const yearEl = document.getElementById('year');
const formStatus = document.getElementById('formStatus');
const copyEmailBtn = document.getElementById('copyEmailBtn');
const contactEmail = 'jibril.khattaf@icloud.com';

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

function setMenu(open) {
  if (!menuToggle || !navbar) return;
  menuToggle.classList.toggle('active', open);
  navbar.classList.toggle('active', open);
  menuToggle.setAttribute('aria-expanded', String(open));
}

menuToggle?.addEventListener('click', () => {
  const open = navbar?.classList.contains('active');
  setMenu(!open);
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

function updateScrollSpy() {
  const y = window.scrollY + 120;
  let current = '';

  sections.forEach((section) => {
    if (section.offsetTop <= y) current = section.id;
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${current}`;
    link.classList.toggle('is-active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function toggleScrollTop() {
  if (window.scrollY > 420) {
    scrollToTopBtn?.classList.add('show');
  } else {
    scrollToTopBtn?.classList.remove('show');
  }
}

function toggleHeaderState() {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 18);
}

let scrollTicking = false;
window.addEventListener('scroll', () => {
  if (scrollTicking) return;
  scrollTicking = true;
  window.requestAnimationFrame(() => {
    updateScrollSpy();
    toggleScrollTop();
    toggleHeaderState();
    scrollTicking = false;
  });
}, { passive: true });

scrollToTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealEls.forEach((el, index) => {
    el.style.transitionDelay = `${Math.min(index * 45, 260)}ms`;
    observer.observe(el);
  });
} else {
  revealEls.forEach((el) => el.classList.add('visible'));
}

const form = document.getElementById('contactForm');

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name')?.value.trim() || '';
  const email = document.getElementById('email')?.value.trim() || '';
  const subject = document.getElementById('subject')?.value.trim() || 'Contact Portfolio';
  const message = document.getElementById('message')?.value.trim() || '';

  const mailSubject = encodeURIComponent(subject);
  const mailBody = encodeURIComponent(
    `Bonjour Jibril,\n\n${message}\n\n---\nNom : ${name}\nEmail : ${email}\n`
  );

  if (formStatus) {
    formStatus.textContent = 'Ouverture de votre application mail...';
    formStatus.classList.remove('error');
    formStatus.classList.add('success');
  }
  window.location.href = `mailto:jibril.khattaf@icloud.com?subject=${mailSubject}&body=${mailBody}`;
});

copyEmailBtn?.addEventListener('click', async () => {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(contactEmail);
    } else {
      const tempInput = document.createElement('input');
      tempInput.value = contactEmail;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      tempInput.remove();
    }

    if (formStatus) {
      formStatus.textContent = 'Adresse email copiee dans le presse-papiers.';
      formStatus.classList.remove('error');
      formStatus.classList.add('success');
    }
  } catch {
    if (formStatus) {
      formStatus.textContent = 'Copie impossible. Vous pouvez copier l\'email affiche.';
      formStatus.classList.remove('success');
      formStatus.classList.add('error');
    }
  }
});

updateScrollSpy();
toggleScrollTop();
toggleHeaderState();
