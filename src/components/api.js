// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/user'; // API URL'nizi buraya ekleyin

export const login = async (credentials) => {
    const { username, password } = credentials;

    // Kullanıcı adı ve şifreyi içeren bir nesne oluştur
    const data = {
        username,
        password
    };

    // POST isteği gönder
    return axios.post(`${API_URL}/login`, data);
};

export const register = async (userData) => {
    return axios.post(`${API_URL}/register`, userData);
};

export const postTweet = async (tweet) => {
    const token = localStorage.getItem('authToken'); // Token'i localStorage'dan alın
    return await axios.post('http://localhost:3000/tweets/user/{userId}', tweet, {
        headers: {
            Authorization: `Bearer ${token}` // Yetkilendirme başlığını ekleyin
        }
    });
};

export const fetchTweets = async () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
        throw new Error("No auth token found");
    }

    return axios.get(`http://localhost:3000/tweets`, {
        headers: {
            'Authorization': `Basic ${token}` 
        }
    });
};