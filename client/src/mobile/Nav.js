import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineMessage, AiOutlineHome, AiOutlineUser } from 'react-icons/ai';

const Nav = () => {
  const { pathname } = useLocation();
  const splitPath = pathname.split('/');
  const currentBasePathName = splitPath[1];
  let currentPathName;
  if (!!currentBasePathName)
  {
    currentPathName = splitPath[splitPath.length - 1];
    if (currentPathName.length > 10)
    {
      currentPathName = currentBasePathName;
    }
    currentPathName = currentPathName[0].toUpperCase() + currentPathName.slice(1);
  }
  const accountId = useSelector((state) => state.session.account.id);
  

  return (
    <div id="mobile-nav">
      <Link to="/messages" className={currentBasePathName === 'messages' ? 'highlight' : ''}><AiOutlineMessage /><p>{currentPathName}</p></Link>
      <Link to="/discover" className={currentBasePathName === 'discover' ? 'highlight' : ''}><AiOutlineHome /><p>{currentPathName}</p></Link>
      <Link to={`/profile/${accountId}`} className={currentBasePathName === 'profile' ? 'highlight' : ''}><p>{currentPathName}</p><AiOutlineUser /></Link>
    </div>
  );
};

export default Nav;
