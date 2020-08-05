import React from 'react';
import { Link } from 'react-router-dom';

import './Message.css';

const Message = ({ messages, isActive }) => {


  if (messages[0].system)
  {
    const message = messages[0];
    return (
      <div
        id={isActive ? 'active-system-message' : ''}
        className="system-message"
      >
        {message.text}
      </div>
    );
  }

  const { id, name, pfp } = messages[0].author;
  return (
    <div className="message-container">
      <Link to={`/profile/${id}`} className="pfp">
        <img src={pfp} alt="pfp" />
      </Link>
      <Link to={`/profile/${id}`} className="name">
        {name}
      </Link>
      {messages.map((message, index) => (
        <p key={`message${index}`}>{message.text}</p>
      ))}
    </div>
  );
};

export default Message;
