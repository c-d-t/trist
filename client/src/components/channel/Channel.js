import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineMenu, AiFillCloseCircle } from 'react-icons/ai';
import { useWindowDimensions } from '../../api/windowDimensions';

import { closeChannel, leavePrivateChannel, joinPrivateChannel, sendMessage } from '../../redux/actions/channelActions';
import { getSocket } from '../../api/socket';

import WarningButton from '../warning_button';
import Message from './message';

import './Channel.css';

const Channel = () => {
  const messageHistoryRef = useRef(null)
  const [input, setInput] = useState('');
  const [isAtBottom, setIsAtBottom] = useState(true);
  const dispatch = useDispatch();
  const [formattedMessages, setFormattedMessages] = useState([]);
  const socket = getSocket();
  const {width} = useWindowDimensions();

  const [currentChannel, messages, lastChannel, messageLoader, channelLoader] = useSelector((state) => {
    return [
      state.channel.currentChannel,
      !state.channel.currentChannel ? null : state.channel.messages[state.channel.currentChannel.id],
      state.channel.lastChannel,
      state.loaders.messageLoader,
      state.loaders.channelLoader,
    ]
  });
  const history = useHistory();

  useEffect(() => {
    const preventBack = () => {
      if (!!currentChannel)
      {
        closeDm();
        history.go(1);
      } 
    }

    if (lastChannel && lastChannel.type === 2)
    {
      dispatch(leavePrivateChannel(lastChannel.id));
    }

    window.addEventListener("popstate", preventBack);

    return () => {
      window.removeEventListener("popstate", preventBack);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChannel, lastChannel]);

  useEffect(() => {
    if (!messages)
    {
      return;
    }

    if (messageHistoryRef.current.scrollTop + messageHistoryRef.current.clientHeight === messageHistoryRef.current.scrollHeight) {
      setIsAtBottom(true);
    } else {
      setIsAtBottom(false);
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

  useEffect(() => {
    if (isAtBottom) {
      messageHistoryRef.current.scrollTop = messageHistoryRef.current.scrollHeight;
    }
  }, [formattedMessages]);

  const onSendMessage = () => {
    if (!currentChannel)
    {
      setInput('');
      return;
    }
    const toSend = input.trim();
    if (toSend.length === 0)
    {
      return;
    }
    dispatch(sendMessage(currentChannel.id, toSend));
    setInput('');
  };

  const closeDm = () => {
    if (!currentChannel)
    {
      return;
    }
    if (currentChannel.type === 2)
    {
      dispatch(leavePrivateChannel(currentChannel.id));
    }
    socket.emit('leave-channel', { channelId: currentChannel.id });
    dispatch(closeChannel());
  };

  return (
    <div id="channel-container" className={currentChannel || channelLoader ? '' : 'channel-hidden'}>
      <div className="header">
        <button
          type="button"
          onClick={closeDm}
        >{width > 1025 ? <AiFillCloseCircle /> : <AiOutlineMenu />}</button>
        {!!currentChannel ? currentChannel.name : null}
      </div>
      <div id="message-history">
        <div ref={messageHistoryRef}>
        <div>
        {channelLoader ? (
          <div>Loading...</div>
        ) :
        !formattedMessages ? null : (
          formattedMessages.map((message, index) => {
            return <Message
              key={`channelMessage${index}`}
              messages={message}
              isActive={index === 0}
            />;
          })
        )}
        </div>
        </div>
      </div>
      <div id="channel-input" className={messageLoader ? 'sending' : ''}>
        {currentChannel && currentChannel.type === 2 ? (
          <WarningButton className="skip" text="Skip" onClick={() => dispatch(joinPrivateChannel())} />
        ) : (
          <button
            type="button"
            onClick={() => alert('Adding images is disabled.')}
          >+</button>
        )}
        <input
          placeholder={messageLoader ? "Sending..." : "Type something..."}
          type="text"
          value={input}
          onChange={(e) => !messageLoader ? setInput(e.target.value) : null}
          onKeyDown={(e) => e.keyCode === 13 ? onSendMessage() : null}
        />
      </div>
    </div>
  );
};

export default Channel;
