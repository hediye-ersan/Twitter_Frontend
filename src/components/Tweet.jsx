
import React from 'react';

const Tweet = ({ tweet, onLike }) => {
  return (
    <div className="tweet">
      <div className="tweet-header">
        <h3>{tweet.username}</h3>
      </div>
      <p>{tweet.text}</p>
      <div className="tweet-footer">
        <button onClick={() => onLike(tweet.id)}>Like</button>
        <span>{tweet.likeCount} Likes</span>
      </div>
    </div>
  );
};

export default Tweet;
