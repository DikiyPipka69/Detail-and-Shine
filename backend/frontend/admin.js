const API = (window.API_BASE || '') + '/api/leads';

const loginView = document.getElementById('loginView');
const adminView = document.getElementById('adminView');
const tokenInput = document.getElementById('tokenInput');
const loginError = document.getElementById('loginError');

function getToken(){ return sessionStorage.getItem('admin-token'); }
function setToken(token){ sessionStorage.setItem('admin-token', token); }
function clearToken(){ sessionStorage.removeItem('admin-token'); }

const SERVICE_LABELS = {express: 'Экспресс-мойка', interior: 'Химчистка салона', full: 'Полный детейлинг'};

async function tryLoad(token){
  const res = await fetch(API, {headers: {'X-Admin-Token': token}});
  if (res.status === 401) return null;
  if (!res.ok) throw new Error('request failed');
  return res.json();
}

function formatDate(iso){
  const d = new Date(iso);
  return d.toLocaleString('ru-RU', {day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'});
}

function renderLeads(leads){
  const container = document.getElementById('leadsContainer');
  if (!leads.length) {
    container.innerHTML = '<div class="admin-empty">Заявок пока нет.</div>';
    return;
  }

  const rows = leads.map(lead => `
    <tr data-id="${lead.id}">
      <td>${formatDate(lead.created_at)}</td>
      <td>${escapeHtml(lead.name)}</td>
      <td>${escapeHtml(lead.phone)}</td>
      <td>${SERVICE_LABELS[lead.service] || lead.service}</td>
      <td>${lead.preferred_date || '—'}</td>
      <td>${escapeHtml(lead.message) || '—'}</td>
      <td><button class="del-btn" data-delete="${lead.id}">Удалить</button></td>
    </tr>
  `).join('');

  container.innerHTML = `
    <table class="admin-table">
      <thead>
        <tr>
          <th>Когда</th><th>Имя</th><th>Телефон</th><th>Услуга</th><th>Дата</th><th>Комментарий</th><th></th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;

  document.querySelectorAll('[data-delete]').forEach(btn => {
    btn.addEventListener('click', () => deleteLead(btn.dataset.delete));
  });
}

function escapeHtml(str){
  const div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}

async function deleteLead(id){
  const token = getToken();
  await fetch(`${API}/${id}`, {method: 'DELETE', headers: {'X-Admin-Token': token}});
  loadLeads();
}

async function loadLeads(){
  const token = getToken();
  try {
    const leads = await tryLoad(token);
    if (leads === null) {
      showLogin('Токен недействителен.');
      return;
    }
    showAdmin();
    renderLeads(leads);
  } catch (err) {
    showLogin('Не удалось загрузить данные.');
  }
}

function showLogin(errorMsg = ''){
  loginView.style.display = 'block';
  adminView.style.display = 'none';
  loginError.textContent = errorMsg;
}

function showAdmin(){
  loginView.style.display = 'none';
  adminView.style.display = 'block';
}

document.getElementById('loginBtn').addEventListener('click', async () => {
  const token = tokenInput.value.trim();
  if (!token) return;
  setToken(token);
  loadLeads();
});

tokenInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') document.getElementById('loginBtn').click();
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  clearToken();
  tokenInput.value = '';
  showLogin();
});

// Auto-login if a token is already stored in this browser tab session
if (getToken()) {
  loadLeads();
} else {
  showLogin();
}
