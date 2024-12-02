import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth"; // Подписка на изменения авторизации
import { auth } from "../../firebase.js"; // Используем обновлённый экспорт

const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Подписка на изменение состояния авторизации
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
