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
