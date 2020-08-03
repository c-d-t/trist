import React from 'react';

import WarningButton from '../warning_button';

const UserItem = ({ pfp, name, secondary, buttonOne, buttonTwo, className }) => {
  return (
    <div className={`sm ${className}`}>
      <img src={pfp} alt="pfp" className="img"></img>
      <div className="info">
        <div className="primary">{name}</div>
        <div className="secondary">{secondary}</div>
      </div>
      <div className="action-buttons">
        {!buttonOne ? null : !buttonOne.warning ?
          <button type="button" onClick={buttonOne.onClick} >{buttonOne.text}</button> :
          <WarningButton text={buttonOne.text} onClick={buttonOne.onClick} />
        }
        {!buttonTwo ? null : !buttonTwo.warning ?
          <button type="button" onClick={buttonTwo.onClick} >{buttonTwo.text}</button> :
          <WarningButton text={buttonTwo.text} onClick={buttonTwo.onClick} />
        }
      </div>
    </div>
  );
};

export default UserItem;
