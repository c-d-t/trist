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
      <Link to="/discover/open" className="md">
        <div className="img"><AiOutlineUsergroupAdd /></div>
        <div className="primary">Open Chat</div>
      </Link>
    </div>
    </>
  );
};

export default Discover;
