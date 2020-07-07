import React from 'react';

const Friend = ({ username }) => {
  return (
    <div className="item">
      <div className="icon"></div>
      {username}
    </div>
  );
};

export default Friend;
