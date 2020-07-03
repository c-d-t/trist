import React, { Children, cloneElement } from 'react';

const Tabs = ({ activeTab, onClick, children }) => {
  const elements = Children.map(children, (child, index) => {
    return cloneElement(child, {
      isActive: index === activeTab,
      onClick: onClick(index),
    });
  });

  return (
    <div>
      {elements}
    </div>
  );
};

export default Tabs;
