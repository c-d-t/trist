import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/sessionActions';

import WarningButton from '../warning_button';

const Settings = () => {
  const dispatch = useDispatch();

  return (
    <div className="list-container">
      <button className="sm">Settings are in the works</button>
      <button className="sm">For a more customizable experience</button>
      <button className="sm">I swer darkmode is coming too</button>
      <WarningButton color="#f44" text="Logout" onClick={() => dispatch(logout())} />
    </div>
  );
};

export default Settings;
