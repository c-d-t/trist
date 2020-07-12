import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { openChannel } from '../../redux/actions/channelActions'

import Message from './message';

import './Channel.css';

const Channel = () => {
  const dispatch = useDispatch();

  const currentChannel = useSelector((state) => state.channel.channels[state.channel.currentChannelId]);

  useEffect(() => {
    dispatch(openChannel('5f01de0b6d7c506622f171ad'))
  }, []);

  return (
    <div id="channel-container">
      <div id="message-history">
        {!currentChannel ? null : (
          currentChannel.map((message, index) => {
            return <Message
              key={`channelMessage${index}`}
              name={message.author.name}
              text={message.text}
            />;
          })
        )}
      </div>
      <div id="channel-input">
        <button
          type="button"
        >+</button>
        <input
          placeholder="Message Benjo"
          type="text" />
      </div>
    </div>
  );
};

export default Channel;
