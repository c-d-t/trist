import React, { useState } from 'react';

const WarningButton = ({ text, className, onClick }) => {
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
    <button
      type="button"
      className={className}
      onClick={click}
    >
    {isActive ? 'Are you sure?' : text}
    </button>
  );
};

export default WarningButton;
