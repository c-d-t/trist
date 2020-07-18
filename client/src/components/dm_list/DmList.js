import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getDms, openChannel } from '../../redux/actions/channelActions';

const UserList = () => {
  const dms = useSelector((state) => state.channel.dms)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDms());
  }, []);
  
  const openDm = (id) =>
  {
    dispatch(openChannel(id));
  };

  return (
    <>
    <div className="action-buttons">
      <button>Start DM</button>
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
