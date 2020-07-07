import React from 'react';

import './Dm.css';

const Dm = ({ pfp, username, lastMessage, timestamp }) => {
  return (
    <div className="item">
      <div className="icon">{pfp}</div>
      <div className="content">
        <h1>{username}</h1>
        <p>{lastMessage}</p>
      </div>
      <p className="timestamp">{timestamp}</p>
    </div>
  )
};

export default Dm;
