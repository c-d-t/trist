import React, { Children, cloneElement } from 'react';

const Tabs = ({ activeTab, onClick, children }) => {
  const elements = Children.map(children, (child, index) => {
    return cloneElement(child, {
      className: index === activeTab ? `${child.props.className} active` : child.props.className,
      onClick: () => onClick(index),
    });
  });

  return (
    <>
      {elements}
    </>
  );
};

export default Tabs;
