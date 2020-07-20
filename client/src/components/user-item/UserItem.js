import React from 'react';

const UserItem = ({ pfp, name, secondary, buttonOne, buttonTwo }) => {
  return (
    <div className="sm">
      <div className="img"></div>
      <div className="info">
        <div className="primary">{name}</div>
        <div className="secondary">{secondary}</div>
      </div>
      <div className="action-buttons">
        {!buttonOne ? null : <button type="button" onClick={buttonOne.onClick} >{buttonOne.text}</button>}
        {!buttonTwo ? null : <button type="button" onClick={buttonTwo.onClick} >{buttonTwo.text}</button>}
      </div>
    </div>
  );
};

export default UserItem;
