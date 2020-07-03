import React from 'react';
import './App.css';

import { useSelector } from 'react-redux';

import Landing from './pages/landing';
import Main from './pages/main';

function App() {
  const isLoggedIn = useSelector((state) => state.thisAccount.isLoggedIn);

  return (
    <div id="app">
      {isLoggedIn ? <Main /> : <Landing />}
    </div>
  );
}

export default App;
