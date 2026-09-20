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
// Sections fade and slide in every time they enter the viewport, and
// fade back out when scrolled past — works the same whether scrolling
// down or back up, not just once on first pass.

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('is-visible', entry.isIntersecting);
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
