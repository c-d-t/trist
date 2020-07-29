import React from 'react';

import './Message.css';

const Message = ({ pfp, name, text, timestamp }) => {
  return (
    <div className="message-container">
      <img className="pfp" src="https://res.cloudinary.com/cdt/image/upload/v1596066208/xs5keynvtrv2m5lxnvqa.jpg" alt="pfp">{pfp}</img>
      <h1>{name}</h1>
      <p>{text}</p>
    </div>
  );
};

export default Message;
