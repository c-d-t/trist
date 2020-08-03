import React from 'react';

import './HeaderContent.css';

const HeaderContent = ({ title, children }) => {
  if (!children)
  {
    return null;
  }
  if (!children.length)
  {
    children = [children];
  }

  return (
    <>
    {children.map((child) => {
      return child;
    })}
    </>
  );
};

export default HeaderContent;
