import React from 'react';

import './Message.css';

const Message = ({ pfp, name, text, timestamp }) => {
  return (
    <div className="message-container">
      <div className="pfp">{pfp}</div>
      <h1>{name}</h1>
      <p>{text}</p>
    </div>
  );
};

export default Message;
