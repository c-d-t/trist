import React from 'react';

const Friend = ({ username }) => {
  return (
    <button type="button" className="sm">
      <div className="img"></div>
      <div className="info">
        <div className="primary">{username}</div>
        <div className="secondary">online</div>
      </div>
    </button>
  );
};

export default Friend;
