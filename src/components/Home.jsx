import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [tweets, setTweets] = useState([]);
  const [newTweet, setNewTweet] = useState('');

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axios.get('/tweets');
        setTweets(response.data);
      } catch (error) {
        console.error('Tweetler alınamadı:', error);
      }
    };
    fetchTweets();
  }, []);

  const handleLike = async (tweetId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`/like/${tweetId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Like sayısını güncellemek için tweet listesinde yeniden render yapabiliriz
      setTweets(tweets.map(tweet => 
        tweet.id === tweetId ? { ...tweet, likeCount: tweet.likeCount + 1 } : tweet
      ));
    } catch (error) {
      console.error('Tweet beğenilemedi:', error);
    }
  };

  const handleTweetSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await axios.post('/tweets', { text: newTweet }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewTweet('');
      // Tweet ekledikten sonra listeyi güncelleyebiliriz
      const response = await axios.get('/tweets');
      setTweets(response.data);
    } catch (error) {
      console.error('Tweet gönderilemedi:', error);
    }
  };

  return (
    <div>
      <h1>Twitter</h1>
      <form onSubmit={handleTweetSubmit}>
        <textarea
          value={newTweet}
          onChange={(e) => setNewTweet(e.target.value)}
          placeholder="Bir tweet yaz..."
        />
        <button type="submit">Tweet Gönder</button>
      </form>

      <div>
        {tweets.map(tweet => (
          <div key={tweet.id}>
            <h3>{tweet.username}</h3>
            <p>{tweet.text}</p>
            <button onClick={() => handleLike(tweet.id)}>
              {tweet.likeCount} Beğen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
