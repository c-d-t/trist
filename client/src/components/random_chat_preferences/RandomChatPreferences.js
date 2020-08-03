import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { joinPrivateChannel } from '../../redux/actions/channelActions';

import './RandomChatPreferences.css';

const RandomChatPreferences = () => {
  const dispatch = useDispatch();
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [channelLoader, currentChannel] = useSelector((state) => [state.loaders.channelLoader, state.channel.currentChannel]);

  const onChooseTag = () => {
    setTagInput('');
    if (tags.length === 10) return;
    const toSend = tagInput.trim().replace(/\s+/g, ' ').toLowerCase().substr(0, 25).trim();
    if (toSend.length === 0) return;
    setTags([...tags, toSend]);
  };

  const onDeleteTag = (toDelete) => {
    setTags(tags.filter((_, index) => index !== toDelete))
  };

  const onStart = () => {
    dispatch(joinPrivateChannel());
  };

  return (
    <div className="list-container">
      <h1>Chat Preferences</h1>
      <div id="tags-container">
        <p>Choose some tags to meet people with similar interests. (Maximum 10)</p>
        <div id="tags-input-container">
          {tags.map((tag, index) => {
            return (
              <span key={`tags${index}`} className="tag">
                {tag}
                <span className="delete" onClick={() => onDeleteTag(index)}>
                  x
                </span>
              </span>
            );
          })}
          <input
            type="text"
            placeholder="e.g. Cars 2"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.keyCode === 13 ? onChooseTag() : null}
          />
        </div>
      </div>
      {channelLoader || (currentChannel && currentChannel.type === 2) ? (
        <div
          className="main-button in-conversation"
        >
          In Conversation
        </div>
      ) : (
        <button
          type="button"
          className="main-button"
          onClick={onStart}
        >
          Start
        </button>
      )}
    </div>
  );
};

export default RandomChatPreferences;
