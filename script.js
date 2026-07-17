/* ============================================================
   PORTFOLIO — YOUSEF SABRY  |  script.js — Full Feature Set
   ============================================================ */

/* ─── LOADING SCREEN ──────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
  }, 2000);
});

/* ─── CUSTOM CURSOR ───────────────────────────────────────── */
const dot     = document.getElementById('cursor-dot');
const outline = document.getElementById('cursor-outline');

let mouseX = 0, mouseY = 0;
let outX   = 0, outY   = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top  = mouseY + 'px';
});

function animateCursor() {
  outX += (mouseX - outX) * 0.12;
  outY += (mouseY - outY) * 0.12;
  outline.style.left = outX + 'px';
  outline.style.top  = outY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .skill-box, .package-card, .project-card, .review-card').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

/* ─── PARTICLES ───────────────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H, particles = [];
  const COUNT   = 70;
  const COLOR   = '100, 255, 218';

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function createParticle() {
    return {
      x:   Math.random() * W,
      y:   Math.random() * H,
      r:   Math.random() * 1.8 + 0.4,
      vx:  (Math.random() - 0.5) * 0.35,
      vy:  (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.5 + 0.1,
    };
  }

  for (let i = 0; i < COUNT; i++) particles.push(createParticle());

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${COLOR}, ${p.alpha})`;
      ctx.fill();
    });

    // Connect nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${COLOR}, ${0.12 * (1 - dist / 120)})`;
          ctx.lineWidth   = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ─── SCROLL PROGRESS ─────────────────────────────────────── */
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = scrolled + '%';
});

/* ─── NAVBAR SCROLL ───────────────────────────────────────── */
const navbar   = document.getElementById('navbar');
const backTop  = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
    backTop.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    backTop.classList.remove('visible');
  }
});

backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ─── MOBILE MENU ─────────────────────────────────────────── */
const menuBtn  = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const menuIcon = menuBtn.querySelector('i');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuIcon.classList.toggle('fa-bars');
  menuIcon.classList.toggle('fa-times');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuIcon.classList.add('fa-bars');
    menuIcon.classList.remove('fa-times');
  });
});

/* ─── DARK / LIGHT THEME ──────────────────────────────────── */
const themeBtn  = document.getElementById('theme-toggle');
const themeIcon = themeBtn.querySelector('i');
let   darkMode  = true;

const savedTheme = localStorage.getItem('ys-theme');
if (savedTheme === 'light') {
  darkMode = false;
  document.documentElement.setAttribute('data-theme', 'light');
  themeIcon.className = 'fas fa-sun';
}

themeBtn.addEventListener('click', () => {
  darkMode = !darkMode;
  if (darkMode) {
    document.documentElement.removeAttribute('data-theme');
    themeIcon.className = 'fas fa-moon';
    localStorage.setItem('ys-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    themeIcon.className = 'fas fa-sun';
    localStorage.setItem('ys-theme', 'light');
  }
});

/* ─── BILINGUAL TOGGLE ────────────────────────────────────── */
const langBtn   = document.getElementById('lang-toggle');
const langLabel = langBtn.querySelector('.lang-label');
let   isArabic  = true;

// Always start Arabic
langLabel.textContent = 'EN';

langBtn.addEventListener('click', () => {
  isArabic = !isArabic;
  applyLanguage(isArabic ? 'ar' : 'en');
});

function applyLanguage(lang) {
  const html = document.documentElement;
  html.setAttribute('lang', lang);
  html.setAttribute('data-lang', lang);
  document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  langLabel.textContent = lang === 'ar' ? 'EN' : 'AR';

  document.querySelectorAll('[data-en][data-ar]').forEach(el => {
    const val = el.getAttribute('data-' + lang);
    if (!val) return;
    // Only use innerHTML when the attribute value actually contains HTML tags
    if (val.includes('<')) {
      el.innerHTML = val;
    } else if (el.children.length === 0) {
      // Only update text content on leaf nodes (no child elements)
      el.textContent = val;
    }
  });

  restartTyped(lang);
}

/* ─── TYPED.JS ────────────────────────────────────────────── */
let typedInstance = null;

function restartTyped(lang) {
  if (typedInstance) { typedInstance.destroy(); }

  const strings = lang === 'ar'
    ? ['واجهات برمجية آمنة', 'حلول رقمية', 'أنظمة متكاملة', 'APIs قابلة للتوسع']
    : ['Secure Backends', 'Web APIs', 'Digital Solutions', 'Scalable Systems'];

  typedInstance = new Typed('#typed-text', {
    strings,
    typeSpeed:  55,
    backSpeed:  30,
    backDelay:  2200,
    loop:       true,
    showCursor: true,
    cursorChar: '|',
  });
}

applyLanguage('ar');


/* ─── REVEAL ON SCROLL ────────────────────────────────────── */
/* ─── REVEAL ON SCROLL (IntersectionObserver) ─────────────── */
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target); // stop watching once revealed
    }
  });
}, { threshold: 0.08 });

reveals.forEach(el => revealObserver.observe(el));

/* ─── STATS COUNTER ───────────────────────────────────────── */
function animateCounter(el) {
  const target   = parseInt(el.getAttribute('data-target'));
  const duration = 1800;
  const step     = target / (duration / 16);
  let   current  = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

// Coaching stats counter animation
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('[data-target]');
      counters.forEach(el => animateCounter(el));
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const coachingSection = document.getElementById('coaching');
if (coachingSection) statObserver.observe(coachingSection);


/* ─── VANILLA TILT ────────────────────────────────────────── */
VanillaTilt.init(document.querySelectorAll('.skill-box[data-tilt]'), {
  max:        12,
  speed:      400,
  glare:      true,
  'max-glare': 0.15,
});

/* ─── SMOOTH ACTIVE NAV LINK ──────────────────────────────── */
const sections    = document.querySelectorAll('section[id], header[id]');
const allNavLinks = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const sTop = sec.offsetTop - 120;
    if (window.scrollY >= sTop) current = sec.getAttribute('id');
  });
  allNavLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

/* ─── GLARE OVERLAY STYLE FIX ───────────────────────────── */
document.querySelectorAll('.js-tilt-glare').forEach(el => {
  el.style.borderRadius = '12px';
});
