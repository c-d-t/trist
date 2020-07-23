import React, { useState, useEffect, useRef } from 'react';

import './DropDown.css';

const DropDown = ({ className, buttonName, children }) => {
  const ref = useRef(null);
  const buttonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  
  useEffect(() => {
    const clickListener = (e) => {
      if (isOpen && !(ref.current).contains(e.target))
      {
        setIsOpen(false);
      }
    };

    if (ref !== null)
    {
      document.addEventListener('click', clickListener);
      return () => {
        document.removeEventListener('click', clickListener);
      }
    }
  }, [ref, isOpen]);

  return (
    <button ref={buttonRef} className={`drop-down-container ${className}`} onClick={(e) => {
      if (e.target === buttonRef.current)
      {
        setIsOpen(!isOpen);
      }
    }}>
      {buttonName}
      <div ref={ref} className={`drop-down ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
    </button>
  );
};

export default DropDown;
