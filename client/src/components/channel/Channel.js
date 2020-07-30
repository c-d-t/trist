import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineMenu } from 'react-icons/ai';

import { closeChannel, leavePrivateChannel, sendMessage } from '../../redux/actions/channelActions';

import Message from './message';

import './Channel.css';

const Channel = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const [formattedMessages, setFormattedMessages] = useState([]);

  const [currentChannel, messages] = useSelector((state) => {
    return [
    state.channel.currentChannel,
    !state.channel.currentChannel ? null : state.channel.messages[state.channel.currentChannel.id]
  ]});
  const history = useHistory();

  useEffect(() => {
    const preventBack = () => {
      if (!!currentChannel)
      {
        closeDm();
        history.go(1);
      } 
    }
    window.addEventListener("popstate", preventBack);

    return () => {
      window.removeEventListener("popstate", preventBack);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChannel]);

  useEffect(() => {
    if (!messages)
    {
      return;
    }

    const msgs = [];
    messages.forEach((message) => {
      const lastIndex = msgs.length - 1;
      if (!!msgs[0] && !message.system && !!msgs[lastIndex][0].author && msgs[lastIndex][0].author.id === message.author.id)
      {
        msgs[lastIndex].push(message);
        return;
      }

      msgs.push([message]);
      return;
      });

    setFormattedMessages(msgs);
  }, [messages]);

  const onSendMessage = () => {
    const toSend = input.trim();
    if (toSend.length === 0)
    {
      return;
    }
    dispatch(sendMessage(currentChannel.id, toSend));
    setInput('');
  };

  const closeDm = () => {
    if (currentChannel.type === 2)
    {
      dispatch(leavePrivateChannel(currentChannel.id));
    }
    dispatch(closeChannel());
  };

  return (
    <div id="channel-container" className={!currentChannel ? 'channel-hidden' : ''}>
      <div className="header">
        <button
          type="button"
          onClick={closeDm}
        ><AiOutlineMenu /></button>
        {!!currentChannel ? currentChannel.name : null}
      </div>
      <div id="message-history">
        {!formattedMessages ? null : (
          formattedMessages.map((message, index) => {
            return <Message
              key={`channelMessage${index}`}
              messages={message}
              isActive={index === 0}
            />;
          })
        )}
      </div>
      <div id="channel-input">
        <button
          type="button"
          onClick={() => alert('Adding images is disabled.')}
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
