// for refreshing
window.onbeforeunload = () => window.scrollTo(0, 0);

// ===== THEME TOGGLE =====
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;

// Load saved preference
if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light');
    themeIcon.className = 'fas fa-sun';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light');
    const isLight = body.classList.contains('light');
    themeIcon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// ===== STICKY NAV =====
const nav = document.getElementById('navbar');
const scrollBtn = document.querySelector('.scroll-button a');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('sticky');
    if (scrollBtn) scrollBtn.style.display = 'flex';
  } else {
    nav.classList.remove('sticky');
    if (scrollBtn) scrollBtn.style.display = 'none';
  }
  highlightNav();
  revealElements();
  animateSkills();
});

// ===== MOBILE MENU =====
    const navbar = document.querySelector('.navbar');
    const menuBtn = document.querySelector('.menu-btn');
    const cancelBtn = document.querySelector('.cancel-btn');
    const navLinks = document.querySelectorAll('.menu li a');

    menuBtn && menuBtn.addEventListener('click', () => {
        navbar.classList.add('active');
        body.style.overflow = 'hidden';
    });

const closeMenu = () => {
    navbar.classList.remove('active');
    body.style.overflow = '';
};

    cancelBtn && cancelBtn.addEventListener('click', closeMenu);
    navLinks.forEach(link => link.addEventListener('click', closeMenu));

// ===== ACTIVE NAV HIGHLIGHT =====
function highlightNav()
 {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 120;
        sections.forEach(sec => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');
            const link = document.querySelector(`.menu a[href="#${id}"]`);

            if (link) {
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
            }
  });
}

// ===== TYPED EFFECT =====
const roles = ['Front-End Developer', '.NET Core Developer', 'CS Graduate', 'Linux Enthusiast'];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.querySelector('.typed-text');

function typeEffect() {
  if (!typedEl) return;
  const current = roles[roleIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex--);
  } else {
    typedEl.textContent = current.substring(0, charIndex++);
  }
  let speed = isDeleting ? 50 : 90;
  if (!isDeleting && charIndex === current.length + 1) {
    speed = 1800; isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }
  setTimeout(typeEffect, speed);
}
typeEffect();

// ===== SCROLL REVEAL =====
function revealElements() {
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) el.classList.add('visible');
  });
}

// Add reveal class to cards/grids on load
document.addEventListener('DOMContentLoaded', () => {
  const targets = [
    '.skill-card', '.project-card', '.contact-card',
    '.about-grid', '.contact-form', '.about-code-card'
  ];
  targets.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.07}s`;
    });
  });
  revealElements();
  animateSkills();
});

// ===== SKILL BARS ANIMATION =====
let skillsAnimated = false;
function animateSkills() {
  if (skillsAnimated) return;
  const section = document.getElementById('skills');
  if (!section) return;
  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    document.querySelectorAll('.skill-fill').forEach(bar => {
      bar.classList.add('animated');
    });
    skillsAnimated = true;
  }
}

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm && contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  // Simulate sending (replace with actual EmailJS / Formspree / backend call)
  setTimeout(() => {
    btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
    btn.disabled = false;
    formSuccess.classList.add('show');
    contactForm.reset();
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1500);
});

// ===== SMOOTH SCROLL for all anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 70;
      window.scrollTo({ top: target.offsetTop - navH, behavior: 'smooth' });
    }
  });
});