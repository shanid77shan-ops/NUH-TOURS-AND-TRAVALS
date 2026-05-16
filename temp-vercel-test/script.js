// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== STARS =====
const starsContainer = document.getElementById('stars');
for (let i = 0; i < 80; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  star.style.cssText = `
    left: ${Math.random() * 100}%;
    top: ${Math.random() * 100}%;
    --dur: ${2 + Math.random() * 4}s;
    --delay: ${Math.random() * 4}s;
    width: ${Math.random() > 0.7 ? 3 : 2}px;
    height: ${Math.random() > 0.7 ? 3 : 2}px;
    opacity: ${0.1 + Math.random() * 0.4};
  `;
  starsContainer.appendChild(star);
}

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll(
  '.service-card, .dest-card, .why-card, .stat-item, .contact-item'
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, (entry.target.dataset.delay || 0) * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealElements.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  el.dataset.delay = i % 6;
  observer.observe(el);
});

// ===== STAT COUNTER =====
const statNums = document.querySelectorAll('.stat-num');

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const numMatch = text.match(/[\d,]+/);
        if (numMatch) {
          const end = parseInt(numMatch[0].replace(',', ''));
          const suffix = text.replace(numMatch[0], '');
          let start = 0;
          const duration = 1800;
          const step = Math.ceil(end / (duration / 16));
          const timer = setInterval(() => {
            start = Math.min(start + step, end);
            el.textContent = start.toLocaleString() + suffix;
            if (start >= end) clearInterval(timer);
          }, 16);
        }
        countObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);

statNums.forEach(el => countObserver.observe(el));

// ===== CONTACT FORM =====
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(() => {
    form.innerHTML = `
      <div class="form-success">
        <svg viewBox="0 0 64 64" fill="none" width="64" height="64" style="margin:0 auto 20px;display:block">
          <circle cx="32" cy="32" r="28" stroke="url(#sg)" stroke-width="2.5"/>
          <path d="M20 32l8 8 16-16" stroke="url(#sg)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          <defs><linearGradient id="sg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse"><stop stop-color="#f5d08a"/><stop offset="1" stop-color="#b8860b"/></linearGradient></defs>
        </svg>
        <p style="font-family:'Cinzel',serif;font-size:20px;color:#f5d08a;margin-bottom:12px">Thank You!</p>
        <p style="font-family:'Lato',sans-serif;font-size:14px;color:rgba(255,255,255,0.6);font-weight:300">
          Your enquiry has been received. Our team will contact you shortly.
        </p>
        <p style="margin-top:16px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#D4A017">
          Travel Safe &bull; Travel Smart &bull; Travel with NUH
        </p>
      </div>
    `;
  }, 1200);
});

// ===== SMOOTH PARALLAX ON HERO =====
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero-bg');
  if (hero) {
    hero.style.transform = `translateY(${window.scrollY * 0.3}px)`;
  }
});
