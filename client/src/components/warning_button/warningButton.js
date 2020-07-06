import React, { useState } from 'react';

import './WarningButton.css';

const WarningButton = ({ text, color, onClick }) => {
  const [isActive, setIsActive] = useState(false);

  const click = () => {
    if (!isActive)
    {
      setIsActive(true);
      return;
    }
    onClick();
  }

  return (
    <div className="warning-button">
      <button
        type="button"
        style={{ backgroundColor: color }}
        onClick={click}
      >
      {isActive ? 'Are you sure?' : text}
      </button>
    </div>
  );
};

export default WarningButton;
