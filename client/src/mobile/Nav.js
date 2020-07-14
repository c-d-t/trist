import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div id="mobile-nav">
      <Link to="/">Discover</Link>
      <Link to="/">Home</Link>
      <Link to="/">Profile</Link>
    </div>
  );
};

export default Nav;
