
import React, { useState, useEffect } from 'react';
import Tweet from './Tweet';

const TweetList = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/tweets')
      .then(response => response.json())
      .then(data => setTweets(data))
      .catch(error => console.error('Error fetching tweets:', error));
  }, []);

  const handleLike = (tweetId) => {
    fetch(`http://localhost:3000/likes/${tweetId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: 1 }), // Örnek kullanıcı ID'si
    })
      .then(response => response.json())
      .then(() => {
        setTweets(prevTweets => 
          prevTweets.map(tweet =>
            tweet.id === tweetId ? { ...tweet, likeCount: tweet.likeCount + 1 } : tweet
          )
        );
      })
      .catch(error => console.error('Error liking tweet:', error));
  };

  return (
    <div className="tweet-list">
      {tweets.map(tweet => (
        <Tweet key={tweet.id} tweet={tweet} onLike={handleLike} />
      ))}
    </div>
  );
};

export default TweetList;
