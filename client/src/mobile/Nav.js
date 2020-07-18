import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineMessage, AiOutlineHome, AiOutlineUser } from 'react-icons/ai';

const Nav = () => {
  const { pathname } = useLocation();

  return (
    <div id="mobile-nav">
      <Link to="/messages" className={pathname === '/messages' ? 'highlight' : ''}><AiOutlineMessage /><p>Messages</p></Link>
      <Link to="/discover" className={pathname === '/discover' ? 'highlight' : ''}><AiOutlineHome /><p>Discover</p></Link>
      <Link to="/profile" className={pathname === '/profile' ? 'highlight' : ''}><p>Profile</p><AiOutlineUser /></Link>
    </div>
  );
};

export default Nav;
