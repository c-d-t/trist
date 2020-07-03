import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Option.css';

const Option = ({ title }) => {
  const location = useLocation();
  const pathTitle = `/${title.toLowerCase().replace(' ', '_')}`;
  const isActive = location.pathname === pathTitle;

  return (
    <Link
      to={pathTitle}
      className="option"
      style={isActive ? active : null}
    >
      {title}
    </Link>
  );
};

const active = {
  backgroundColor: '#eee',
};

export default Option;
