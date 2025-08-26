```markdown
# Next.js Project

## Описание
Это проект на Next.js 13 с использованием **App Router** и модульной структурой компонентов.  
Включает страницы для регистрации, поиска и просмотра объектов, а также общие UI-компоненты.

## Структура проекта

```
app/
├─ pages/
│  ├─ explore/           # Страница с исследованиями/поиском объектов
│  ├─ register/          # Страница регистрации
│  └─ page.js            # Главная страница
├─ components/           # Компоненты интерфейса
│  ├─ ReviewCard.jsx
│  ├─ LoginModal.jsx
│  ├─ Navbar.jsx
│  ├─ PropertyCard.jsx
│  ├─ RatingStars.jsx
│  └─ SearchFilters.jsx
├─ globals.css           # Глобальные стили
├─ layout.js             # Основной layout
└─ favicon.ico           # Иконка сайта

public/                   # Статические файлы (SVG, изображения)
package.json              # Зависимости и скрипты
package-lock.json         # Зависимости
next.config.mjs           # Конфигурация Next.js
postcss.config.mjs        # Конфигурация PostCSS
eslint.config.mjs         # Конфигурация ESLint
```

## Установка и запуск

1. Установить зависимости:
```bash
npm install
```

2. Запуск проекта в режиме разработки:
```bash
npm run dev
```
После этого проект будет доступен на `http://localhost:3000`.

3. Сборка и запуск production:
```bash
npm run build
npm start
```
