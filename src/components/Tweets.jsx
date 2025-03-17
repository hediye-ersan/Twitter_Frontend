// src/components/Tweets.jsx
import React, { useEffect, useState } from "react";
import { fetchTweets } from "./api";

const Tweets = () => {
    const [tweets, setTweets] = useState([]);

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
        <div>
            <h2>Tweets</h2>
            <ul style={{ border: "1px solid red", padding: "10px" }}>  
                {tweets.length > 0 ? (
                    tweets.map((tweet) => (
                        <li 
                            key={tweet.id} 
                            style={{ 
                                color: "black", 
                                fontSize: "18px", 
                                display: "block", 
                                padding: "5px", 
                                borderBottom: "1px solid gray" 
                            }}
                        >
                            <strong>{tweet.username}:</strong> {tweet.text}
                        </li>
                    ))
                ) : (
                    <p style={{ color: "red" }}>No tweets available</p>
                )}
            </ul>
        </div>
    );
};

export default Tweets;
