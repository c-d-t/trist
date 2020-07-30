import React from 'react';

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

  const { name, pfp } = messages[0].author;
  return (
    <div className="message-container">
      <img className="pfp" src="https://res.cloudinary.com/cdt/image/upload/v1596066208/xs5keynvtrv2m5lxnvqa.jpg" alt="pfp">{pfp}</img>
      <h1>{name}</h1>
      {messages.map((message, index) => (
        <p key={`message${index}`}>{message.text}</p>
      ))}
    </div>
  );
};

export default Message;
