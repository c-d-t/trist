import React from 'react';
import { AiOutlineUserAdd, AiOutlineUsergroupAdd } from 'react-icons/ai';

const Discover = () => {
  return (
    <>
    <div className="list-container">
      <button type="button" className="md">
        <div className="img"><AiOutlineUserAdd /></div>
        <div className="primary">Random Chat</div>
      </button>
      <button type="button" className="md" onClick={() => alert('Open chat is coming soon.')}>
        <div className="img"><AiOutlineUsergroupAdd /></div>
        <div className="primary">Open Chat</div>
      </button>
    </div>
    </>
  );
};

export default Discover;
