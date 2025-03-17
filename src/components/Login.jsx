// src/components/Login.jsx
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from './api';
import { Link } from 'react-router-dom';

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
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
        <div className="w-full max-w-md">
            <div className="flex justify-center mb-6">
                <svg
                    viewBox="0 0 24 24"
                    className="h-8 w-8 text-[#1DA1F2]"
                    fill="currentColor"
                >
                    <g>
                        <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                    </g>
                </svg>
            </div>

            <h1 className="text-2xl font-bold text-center mb-8">
                Log in to Twitter
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="text"
                        placeholder="Phone, email, or username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-3 rounded-md bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent"
                        required
                    />
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 rounded-md bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#1DA1F2] text-white font-medium py-3 rounded-full hover:bg-[#1a91da] transition duration-200"
                >
                    Log in
                </button>
            </form>

            <div className="mt-6 text-center text-[#1DA1F2] text-sm">
                <div className="space-x-1">
                    <a href="#" className="hover:underline">
                        Forgot password?
                    </a>
                    <span>·</span>
                    <Link to="/register" className="hover:underline">
                        Sign up for Twitter
                    </Link>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Login;