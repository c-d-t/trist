import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiOutlineMessage, AiOutlineHome, AiOutlineUser, AiOutlineRight } from 'react-icons/ai';

import Tabs from '../../components/tabs';
import DmList from '../../components/dm_list';
import Discover from '../../components/discover';
import MainTab from './header_tab';

import './Header.css';

const Header = () => {
  const [activeTab, setActiveTab] = useState(1);
  const accountId = useSelector((state) => state.session.account.id);

  return (
    <nav>
      <h1>trist</h1>
      <Tabs activeTab={activeTab} onClick={setActiveTab}>
        <MainTab isActive={activeTab === 0}><AiOutlineMessage /></MainTab>
        <MainTab isActive={activeTab === 1}><AiOutlineHome /></MainTab>
        <MainTab isActive={activeTab === 2}><AiOutlineUser /></MainTab>
      </Tabs>
      <div style={{marginTop: '10px'}}>
        {function() {
          switch(activeTab)
          {
            case 0:
              return (
                <div className="list-container">
                  <Link to="/messages" className="sm"><p>Messages</p><AiOutlineRight className="action-buttons" /></Link>
                </div>
              );
            case 1:
              return <Discover />;
            case 2:
              return (
                <div className="list-container">
                  <Link to={`/profile/${accountId}`} className="sm"><p>Profile</p><AiOutlineRight className="action-buttons" /></Link>
                  <Link to="/profile/friends" className="sm"><p>Friends</p><AiOutlineRight className="action-buttons" /></Link>
                  <Link to="/profile/settings" className="sm"><p>Settings</p><AiOutlineRight className="action-buttons" /></Link>
                </div>
              );
            default:
              return;
          }
        }()}
      </div>
    </nav>
  );
};

export default Header;
