// src/components/Login.jsx
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from './api';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await login({ username, password });
          console.log('Login successful:', response.data);
  
          // Kullanıcı adı ve şifreyi Base64 formatına çevir
          const authToken = btoa(`${username}:${password}`);
          localStorage.setItem('authToken', authToken);
  
          history.push('/tweets'); // Başarılı giriş sonrası Tweetler sayfasına yönlendir
      } catch (error) {
          console.error('Login failed:', error);
      }
  };
  

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
        </div>
    );
};

export default Login;