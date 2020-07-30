import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getOpenChannels, openChannel } from '../../redux/actions/channelActions';
import { getSocket } from '../../api/socket';


const RandomChatPreferences = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channel.openChannels);
  const socket = getSocket();

  useEffect(() => {
    dispatch(getOpenChannels());
  }, []);

  const makeOpenChannel = (channelId) => {
    socket.emit('join-channel', { channelId });
    dispatch(openChannel(channelId));
  };

  return (
    <div className="list-container">
      <h1>Open Channels</h1>
      {channels.map((channel, index) => (
        <button key={`openChannels${index}`} className="sm" onClick={() => makeOpenChannel(channel.id)}>
          <div className="info">
            <div className="primary">#{channel.title}</div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default RandomChatPreferences;
