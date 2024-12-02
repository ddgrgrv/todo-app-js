import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom"; // Для редиректа
import { Link } from "react-router-dom"; // Для ссылки

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Хук для редиректа

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Сбрасываем ошибку перед отправкой

    try {
      // Попытка зарегистрировать пользователя
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered successfully");

      // После успешной регистрации перенаправляем на главную страницу
      navigate("/"); // Или укажите путь, где находится ваш компонент главной страницы
    } catch (err) {
      setError(err.message); // Отображаем ошибку, если она произошла
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Ссылка на страницу логина */}
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
