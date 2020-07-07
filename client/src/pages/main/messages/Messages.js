import React from 'react';

import Dm from './Dm';

import './Messages.css';

const Messages = () => {
  return (
    <>
      <div className="create-container">
        <button>Start DM</button>
        <button>Make Group</button>
      </div>
      <Dm username="benjo" lastMessage="Were are you?" timestamp="1:47pm" />
      <Dm username="bobby" lastMessage="your turn" timestamp="Yesterday" />
      <Dm username="beerb" lastMessage="HI" timestamp="Yesterday" />
    </>
  );
};

export default Messages;
