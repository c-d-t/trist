import React, { useState, useEffect, useRef } from 'react';

import './DropDown.css';

const DropDown = ({ className, buttonName, children }) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  
  useEffect(() => {
    const clickListener = (e) => {
      if (isOpen && ref.current && !(ref.current).contains(e.target))
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
    <div className="drop-down-container">
      <button type="button" className={`drop-down-button ${className}`} onClick={() => setIsOpen(!isOpen)}>
        {buttonName}
      </button>
      {isOpen ? (
        <div ref={ref} className="drop-down-content">
          {children}
        </div>
      ) : null}
    </div>
  );
};

export default DropDown;
