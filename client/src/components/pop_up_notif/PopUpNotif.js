import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearNotification } from '../../redux/actions/notificationActions';

import './PopUpNotif.css';

const PopUpNotif = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications);

  if (!notifications.message) return null;

  return (
    <div id="pop-up-notif">
      <p>{notifications.message}</p>
      <button type="button" onClick={() => dispatch(clearNotification())}>x</button>
    </div>
  );
};

export default PopUpNotif;
