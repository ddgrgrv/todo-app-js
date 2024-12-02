import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom"; // Для редиректа
import { Link } from "react-router-dom"; // Для ссылки

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Хук для редиректа

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Сбрасываем ошибку перед отправкой

    try {
      // Попытка войти в систему
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully");

      // После успешного входа перенаправляем на главную страницу
      navigate("/"); // Или укажите путь, где находится ваш компонент главной страницы
    } catch (err) {
      setError(err.message); // Отображаем ошибку, если она произошла
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Ссылка на страницу регистрации */}
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default LoginPage;
