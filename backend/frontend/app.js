const API = (window.API_BASE || '') + '/api/leads';

const form = document.getElementById('bookingForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const button = form.querySelector('button');
  button.disabled = true;
  status.textContent = 'Отправляем...';
  status.className = 'form-status';

  const payload = {
    name: form.name.value.trim(),
    phone: form.phone.value.trim(),
    service: form.service.value,
    preferred_date: form.preferred_date.value || null,
    message: form.message.value.trim(),
  };

  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('request failed');

    status.textContent = 'Заявка отправлена! Перезвоним в течение часа.';
    status.className = 'form-status success';
    form.reset();
  } catch (err) {
    status.textContent = 'Не получилось отправить. Попробуйте ещё раз.';
    status.className = 'form-status error';
  } finally {
    button.disabled = false;
  }
});

// ---------- Scroll reveal ----------
// Sections fade and slide in only when scrolling downward past them.
// Scrolling back up never triggers or replays the animation — once a
// section has appeared, it stays visible.

let lastScrollY = window.scrollY;
let scrollDirection = 'down';

window.addEventListener('scroll', () => {
  const currentY = window.scrollY;
  scrollDirection = currentY > lastScrollY ? 'down' : 'up';
  lastScrollY = currentY;
}, {passive: true});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && scrollDirection === 'down') {
      entry.target.classList.add('is-visible');
    }
  });
}, {threshold: 0.15});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---------- FAQ accordion ----------
// Only one answer open at a time. The expand/collapse animation itself
// is pure CSS (grid-template-rows trick) — this just toggles state.

document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const alreadyOpen = btn.getAttribute('aria-expanded') === 'true';

    document.querySelectorAll('.faq-question').forEach(other => {
      other.setAttribute('aria-expanded', 'false');
    });

    if (!alreadyOpen) {
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});
