import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getDms } from '../../../redux/actions/channelActions';

import Dm from './Dm';

import './Messages.css';

const Messages = () => {
  const dms = useSelector((state) => state.channel.dms)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDms());
  }, []);

  const openDm = (id) =>
  {
    console.log('hi')
  };

  return (
    <>
      <div className="create-container">
        <button>Start DM</button>
        <button>Make Group</button>
      </div>
      {dms.map((dm, index) => (
        <Dm key={`dms${index}`} username={dm.name} lastMessage="test" timestamp="now" />
      ))}
    </>
  );
};

export default Messages;
