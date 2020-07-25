import React, { useState, useEffect, useRef } from 'react';

const WarningButton = ({ text, className, onClick }) => {
  const ref = useRef(null);
  const [isActive, setIsActive] = useState(false);

  const click = () => {
    if (!isActive)
    {
      setIsActive(true);
      return;
    }
    onClick();
  }

  useEffect(() => {
    const clickListener = (e) => {
      if (ref.current && !(ref.current).contains(e.target))
      {
        setIsActive(false);
      }
    };

    if (ref !== null)
    {
      document.addEventListener('click', clickListener);
      return () => {
        document.removeEventListener('click', clickListener);
      }
    }
  }, [ref]);

  return (
    <button
      ref={ref}
      type="button"
      className={className}
      onClick={click}
    >
    {isActive ? 'Are you sure?' : text}
    </button>
  );
};

export default WarningButton;
