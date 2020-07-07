import React from 'react';

import Message from './message';

import './Channel.css';

const Channel = () => {
  return (
    <div id="channel-container">
      <div id="message-history">
        <Message name="benjo" text="Top" />
        <Message name="benjo" text="Hello, there" />
        <Message name="benjo" text="Hello, there" />
        <Message name="benjo" text="Hello, there" />
        <Message name="benjo" text="DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code." />
        <Message name="benjo" text="Hello, there" />
        <Message name="benjo" text="Hello, there" />
        <Message name="benjo" text="Hello, there" />
        <Message name="benjo" text="Hello, there" />
        <Message name="benjo" text="Hello, there" />
        <Message name="benjo" text="Hello, there" />
        <Message name="benjo" text="Hello, there" />
        <Message name="benjo" text="Hello, there" />
        <Message name="benjo" text="Hello, there" />
        <Message name="benjo" text="Hello, there" />
        <Message name="benjo" text="Hello, there" />
        <Message name="benjo" text="Hello, there" />
        <Message name="benjo" text="Hello, there" />
        <Message name="benjo" text="Hello, there" />
        <Message name="benjo" text="Hello, there" />
        <Message name="benjo" text="Hello, there" />
        <Message name="benjo" text="Hello, there" />
        <Message name="benjo" text="Hello, there" />
        <Message name="benjo" text="Hello, there" />
        <Message name="benjo" text="Hello, there" />
        <Message name="benjo" text="Where are you?" />
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
