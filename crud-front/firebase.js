import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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

// Функция для получения UID текущего пользователя
export const getCurrentUserUID = (auth) => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user.uid); // UID текущего пользователя
      } else {
        reject("Пользователь не авторизован");
      }
    });
  });
};

// Функция для получения токена текущего пользователя
export const getUserToken = async (auth) => {
  const user = auth.currentUser;
  if (user) {
    return await user.getIdToken();
  }
  throw new Error("Пользователь не авторизован");
};
