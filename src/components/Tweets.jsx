import React, { useEffect, useState } from "react";
import Avatar from "react-avatar"; // react-avatar import edildi
import { fetchTweets } from "./api";
import { FaRegComment, FaRetweet, FaRegHeart } from "react-icons/fa";

const Tweets = () => {
    const [tweets, setTweets] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);  // Kullanıcı bilgisini state'e ekliyoruz

    useEffect(() => {
        const getUserInfo = async () => {
            const authToken = localStorage.getItem('authToken');
            if (authToken) {
                try {
                    const response = await fetch('http://localhost:3000/user/current-user', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Basic ${authToken}`,
                        }
                    });
                    const userData = await response.json();
                    setCurrentUser(userData);  // Kullanıcıyı state'e kaydediyoruz
                } catch (error) {
                    console.error('Error fetching user info:', error);
                }
            }
        };

        getUserInfo();
    }, []);

    useEffect(() => {
        const getTweets = async () => {
            try {
                const response = await fetchTweets();
                console.log("Fetched Tweets:", response.data);
                setTweets(response.data);
            } catch (error) {
                console.error("Error fetching tweets:", error);
            }
        };

        getTweets();
    }, []);

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg">
            {/* Üst Kısım - Sayfa Başlığı */}
            <h2 className="text-xl font-bold p-4 border-b">Home</h2>

            {/* Tweet Yazma Alanı */}
            <div className="p-4 border-b flex items-center">
                <Avatar
                    name={currentUser ? currentUser.username : "User"}  // Eğer kullanıcı verisi varsa onu kullanıyoruz
                    size="48"
                    round={true}
                    className="mr-4"
                />
                <input
                    type="text"
                    placeholder="What's happening?"
                    className="w-full p-2 border rounded-full text-lg focus:outline-none"
                />
            </div>

            {/* Tweet Listesi */}
            <ul>
                {tweets.length > 0 ? (
                    tweets.map((tweet) => (
                        <li key={tweet.id} className="flex border-b p-4 hover:bg-gray-100">
                            {/* Profil Resmi (react-avatar kullanıldı) */}
                            <Avatar 
                                name={tweet.username} 
                                src={tweet.profilePic} 
                                size="48" 
                                round={true} 
                                className="mr-4"
                            />

                            {/* Tweet İçeriği */}
                            <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                    <span className="font-bold">{tweet.username}</span>
                                    <span className="text-gray-500">@{tweet.username} · 1m</span>
                                </div>
                                <p className="text-gray-800">{tweet.text}</p>

                                {/* Tweet İçinde Görsel Varsa */}
                                {tweet.image && (
                                    <img src={tweet.image} alt="Tweet Media" className="rounded-lg mt-2" />
                                )}

                                {/* Etkileşim Butonları */}
                                <div className="flex justify-between text-gray-500 mt-3 text-sm">
                                    <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-500">
                                        <FaRegComment />
                                        <span>3</span>
                                    </div>
                                    <div className="flex items-center space-x-1 cursor-pointer hover:text-green-500">
                                        <FaRetweet />
                                        <span>5</span>
                                    </div>
                                    <div className="flex items-center space-x-1 cursor-pointer hover:text-red-500">
                                        <FaRegHeart />
                                        <span>14</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-center text-red-500 py-4">No tweets available</p>
                )}
            </ul>
        </div>
    );
};

export default Tweets;
