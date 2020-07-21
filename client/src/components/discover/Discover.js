import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineUserAdd, AiOutlineUsergroupAdd } from 'react-icons/ai';

const Discover = () => {
  return (
    <>
    <div className="list-container">
      <Link to="/discover/random" className="md">
        <div className="img"><AiOutlineUserAdd /></div>
        <div className="primary">Random Chat</div>
      </Link>
      <button type="button" className="md" onClick={() => alert('Open chat is coming soon.')}>
        <div className="img"><AiOutlineUsergroupAdd /></div>
        <div className="primary">Open Chat</div>
      </button>
    </div>
    </>
  );
};

export default Discover;
