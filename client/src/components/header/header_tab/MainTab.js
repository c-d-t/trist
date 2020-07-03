import React from 'react';

import './MainTab.css';

const MainTab = ({ title, onClick, isActive }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="main-tab"
      style={isActive ? activeColor : defaultColor}
    >
      {title}
    </button>
  );
};

const defaultColor = {
  backgroundColor: '#444',
};

const activeColor = {
  backgroundColor: '#444',
  backgroundImage: 'linear-gradient(-45deg, rgb(0, 233, 105), rgb(0, 221, 184)',
  boxShadow: '#ccc 3px 4px 0 0',
  transform: 'translate(0, -1px)',
};

export default MainTab;