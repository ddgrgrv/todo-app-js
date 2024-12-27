import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Конфигурация Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
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
