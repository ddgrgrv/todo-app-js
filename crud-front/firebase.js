import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Импортируйте getAuth для аутентификации

// Конфигурация Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAMPOg8BAjuMI5q0lLMDLskdiHrIDizqo8",
  authDomain: "todo-app-js-209d7.firebaseapp.com",
  projectId: "todo-app-js-209d7",
  storageBucket: "todo-app-js-209d7.firebasestorage.app",
  messagingSenderId: "737268023073",
  appId: "1:737268023073:web:71f9cebbe596fb4c578860",
  measurementId: "G-HSRTYKKCQS",
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Экспорт аутентификации
export const auth = getAuth(app);
