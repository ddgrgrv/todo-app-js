import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Основной компонент приложения
import './styles/global.css'; // Ваши стили
import './styles/home.css'; // Ваши стили
import './styles/root.css'; // Ваши стили

// Найти корневой элемент
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement); // Создаем "корень" с использованием React 18 API
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
