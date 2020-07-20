import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineMenu } from 'react-icons/ai';

import { closeChannel, sendMessage } from '../../redux/actions/channelActions';

import Message from './message';

import './Channel.css';

const Channel = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const [currentChannelId, currentChannel] = useSelector((state) => [
    state.channel.currentChannelId,
    state.channel.channels[state.channel.currentChannelId]
  ]);

  const onSendMessage = () => {
    const toSend = input.trim();
    if (toSend.length === 0)
    {
      return;
    }
    dispatch(sendMessage(currentChannelId, toSend));
    setInput('');
  };

  const closeDm = () => {
    dispatch(closeChannel());
  };

  return (
    <div id="channel-container" className={!currentChannelId ? 'channel-hidden' : ''}>
      <div className="header">
        <button
          type="button"
          onClick={closeDm}
        ><AiOutlineMenu /></button>
        Berb
      </div>
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
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.keyCode === 13 ? onSendMessage() : null}
        />
      </div>
    </div>
  );
};

export default Channel;
