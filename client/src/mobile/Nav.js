import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineMessage, AiOutlineHome, AiOutlineUser } from 'react-icons/ai';

const Nav = () => {
  const { pathname } = useLocation();
  const splitPath = pathname.split('/');
  const currentBasePathName = splitPath[1];
  let currentPathName;

  if (!currentPathName)
  {
    currentPathName = currentBasePathName;
  }
  else
  {
    currentPathName = splitPath[splitPath.length - 1];
    currentPathName = currentPathName[0].toUpperCase() + currentPathName.slice(1);
  }
  

  return (
    <div id="mobile-nav">
      <Link to="/messages" className={currentBasePathName === 'messages' ? 'highlight' : ''}><AiOutlineMessage /><p>{currentPathName}</p></Link>
      <Link to="/discover" className={currentBasePathName === 'discover' ? 'highlight' : ''}><AiOutlineHome /><p>{currentPathName}</p></Link>
      <Link to="/profile" className={currentBasePathName === 'profile' ? 'highlight' : ''}><p>{currentPathName}</p><AiOutlineUser /></Link>
    </div>
  );
};

export default Nav;
