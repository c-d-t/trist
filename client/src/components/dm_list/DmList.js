import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getDms, openChannel } from '../../redux/actions/channelActions';

import DropDown from '../drop_down';
import Friends from './friends';

const UserList = () => {
  const dms = useSelector((state) => state.channel.dms)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDms());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const openDm = (id) =>
  {
    dispatch(openChannel(id));
  };

  return (
    <>
    <div className="action-buttons">
      <DropDown buttonName="Start DM">
        <h1>Choose A Friend</h1>
        <input placeholder="Username"></input>
        <Friends />
      </DropDown>
      <button>Make Group</button>
    </div>
    <div className="list-container">
      {!dms ? null : dms.map((dm, index) => (
        <button
          key={`dms${index}`}
          type="button"
          className="sm"
          onClick={() => openDm(dm.id)}
        >
          <div className="img"></div>
          <div className="info">
            <div className="primary">{dm.title}</div>
            <div className="secondary">test</div>
          </div>
        </button>
      ))}
    </div>
    </>
  );
};

export default UserList;
