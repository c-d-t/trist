import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Requests from './requests';
import Friends from './friends';

import './Friends.css';

const Relations = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const errors = useSelector((state) => state.errors.formErrors);

  const renderContent = () => {
    switch(currentTab) 
    {
      case 0: return <Friends />;
      case 1: return <Requests />;
      default: return null;
    }
  };

  return (
    <>
      <div className="action-buttons">
        <button type="button" style={currentTab === 0 ? { backgroundColor: 'rgb(33, 226, 152)' } : {}} onClick={() => setCurrentTab(0)}>Friends</button>
        <button type="button" style={currentTab === 1 ? { backgroundColor: 'rgb(33, 226, 152)' } : {}} onClick={() => setCurrentTab(1)}>Requests</button>
        <button type="button" style={currentTab === 2 ? { backgroundColor: 'rgb(33, 226, 152)' } : {}} onClick={() => alert('Blocking will be coming soon.')}>Blocks</button>
      </div>
      {!errors ? null : Object.keys(errors).map((errorName, i) => (
        <div key={`formError${i}`} className="add-friend-error">{errors[errorName]}</div>
      ))}

      {renderContent()}
    </>
  );
};

export default Relations;
