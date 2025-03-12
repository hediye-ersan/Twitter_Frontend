import React, { useState } from "react";
import axios from "axios";

const Login = ({ setAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/user/login", // Backend endpoint'ini kontrol et
        {}, // Basic Auth kullandığımız için body boş
        {
          auth: {
            username,
            password,
          },
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // CORS ve session desteği için gerekli
        }
      );

      if (response.status === 200) {
        localStorage.setItem("auth", btoa(`${username}:${password}`)); // Basic Auth bilgilerini sakla
        setAuthenticated(true);
        alert("Giriş başarılı!");
      }
    } catch (error) {
      alert("Giriş başarısız! Kullanıcı adı veya şifre hatalı.");
    }
  };

  return (
    <div>
      <h2>Giriş Yap</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  );
};

export default Login;
