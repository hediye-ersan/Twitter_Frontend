// src/App.js
import React, { useState } from 'react';
import TweetList from './components/TweetList';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = (token) => {
    setToken(token);
  };

  const handleRegister = () => {
    alert('Registration successful!');
  };

  return (
    <div className="app">
      <h1>Twitter Clone</h1>
      {!token ? (
        <>
          <Login onLogin={handleLogin} />
          <Register onRegister={handleRegister} />
        </>
      ) : (
        <TweetList />
      )}
    </div>
  );
};

export default App;
