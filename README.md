# ✦ Detail & Shine

> Лендинг мобильного автодетейлинга с рабочей формой записи, REST API и закрытой админ-панелью.

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.12-3776AB?style=flat-square&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?style=flat-square&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white" />
</p>

---

## 📸 Превью

<p align="center">
  <img src="docs/preview.png" alt="Detail & Shine" width="900">
</p>

---

## О проекте

**Detail & Shine** — проект, сделанный по сценарию реального сайта для бизнеса.

Посетитель оставляет заявку через форму, данные отправляются на backend и сохраняются в SQLite. Владелец сайта может просматривать и удалять заявки через защищённую админ-панель.

```text
Лендинг
   ↓
Форма записи
   ↓
FastAPI
   ↓
SQLite
   ↓
Админ-панель
```

---

## Возможности

* ✦ Адаптивный лендинг
* 📝 Рабочая форма записи
* ⚡ REST API
* 🗄️ SQLite
* 🔐 Защищённая админ-панель
* 🗑️ Просмотр и удаление заявок
* 🚀 Деплой на Render

---

## Стек

**Frontend:** `HTML` · `CSS` · `JavaScript`

**Backend:** `Python` · `FastAPI` · `Pydantic` · `SQLAlchemy`

**Database:** `SQLite`

---

## Запуск

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Сайт:** `http://localhost:8000`
**Админка:** `http://localhost:8000/admin.html`

Для локальной разработки используется токен:

```text
changeme
```

---

## Структура

```text
DetailShine/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── crud.py
│   │   └── routers.py
│   └── frontend/
│       ├── index.html
│       ├── admin.html
│       ├── app.js
│       ├── admin.js
│       └── style.css
├── LICENSE
└── README.md
```

---

## Идеи для развития

* [ ] Telegram / Email уведомления
* [ ] Система свободных слотов
* [ ] Галерея «до / после»
* [ ] PostgreSQL
* [ ] Полноценная авторизация

---

<p align="center">
  <sub>С уважением, Артём</sub>
</p>
