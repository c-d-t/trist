import React, { useState } from 'react';
import './Header.css';

import Tabs from '../tabs';
import MainTab from './header_tab';

const Header = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <header className={isOpen ? 'header-open' : ''}>
      <h1>trist</h1>
      <Tabs activeTab={activeTab} onClick={(i) => () => setActiveTab(i)}>
        {children.map((child, index) => {
          return <MainTab key={`mainTab${index}`} title={child.props.title} />
        })}
      </Tabs>
      <div style={{marginTop: '10px'}}>
        {children.map((child, index) => {
          return index === activeTab ? child : null;
        })}
      </div>
    </header>
  );
};

export default Header;
