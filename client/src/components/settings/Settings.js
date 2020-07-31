import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineRight, AiFillCaretLeft } from 'react-icons/ai';
import { useWindowDimensions } from '../../api/windowDimensions';

import validators from '../../validators';
import { logout, upgradeAccount, deleteAccount } from '../../redux/actions/sessionActions';

import Tabs from '../tabs';
import Form from '../form';
import Input from '../form/input';
import WarningButton from '../warning_button';

import './Settings.css';

const Settings = () => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const [currentSetting, setCurrentSetting] = useState(null);
  const { status } = useSelector((state) => state.session.account);

  useEffect(() => {
    if (width > 1025)
    {
      setCurrentSetting(0);
    }
  }, [width]);

  return (
    <div id="settings" className={(width < 1025) && currentSetting !== null ? 'active' : ''}>
      <div className="list-container">
        <Tabs activeTab={currentSetting} onClick={setCurrentSetting}>
          <button className="sm">Account <AiOutlineRight className="action-buttons" /></button>
          <button className="sm">Privacy <AiOutlineRight className="action-buttons" /></button>
          <button className="sm">Appearance <AiOutlineRight className="action-buttons" /></button>
        </Tabs>  
        <WarningButton className="sm danger" text="Logout" onClick={() => dispatch(logout())} />
      </div>
      <div className="content">
        {width < 1025 ? (
        <button className="back-button" onClick={() => setCurrentSetting(null)}><AiFillCaretLeft />Settings</button>
        ) : null}
        {function() {
          switch(currentSetting)
          {
            case 0:
              return (
                <div className="list-container">
                  {status === 0 ? <Link to="/upgrade" className="sm">Upgrade Account <AiOutlineRight className="action-buttons" /></Link> : <></>}
                  <WarningButton className="sm danger" text="Delete Account" warning="Are you sure? This action cannot be undone." onClick={() => dispatch(deleteAccount())} />
                </div>
              );
            default:
              return;
          }
        }()}
      </div>
    </div>
  );
};

export default Settings;
