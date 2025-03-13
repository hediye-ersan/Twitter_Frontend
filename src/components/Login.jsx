import React, { useState } from "react";
import axios from "axios";

const Login = ({ setAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const payload = { username, password }; // ✅ Gönderilecek veri
      console.log("Sending payload:", payload);
  
      const response = await axios.post(
        "http://localhost:3000/user/login", // ✅ URL doğru mu?
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // ✅ Gerekli mi?
        }
      );
  
      console.log("Response:", response); // ✅ Tüm response'u gör
      console.log("Response Data:", response.data);
  
      if (response.status === 200 && response.data.includes("Login successful")) {
        localStorage.setItem("auth", btoa(`${username}:${password}`));
        setAuthenticated(true);
        alert("Giriş başarılı!");
      } else {
        alert("Giriş başarısız! Kullanıcı adı veya şifre hatalı.");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error);
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
