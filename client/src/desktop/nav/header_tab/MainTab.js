import React from 'react';

import './MainTab.css';

const MainTab = ({ onClick, isActive, children }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="main-tab"
      style={isActive ? activeColor : {}}
    >
      {children}
    </button>
  );
};


const activeColor = {
  backgroundImage: 'linear-gradient(-45deg, rgb(0, 233, 105), rgb(0, 221, 184)',
  boxShadow: '#ccc 3px 4px 0 0',
  transform: 'translate(0, -1px)',
  color: '#fff',
};

export default MainTab;