import React from 'react';
import './App.css';

import { useSelector } from 'react-redux';

import Landing from './pages/landing';
import Main from './pages/main';

function App() {
  const loggedIn = useSelector((state) => state.session.loggedIn);

  return (
    <div id="app">
      {loggedIn ? <Main /> : <Landing />}
    </div>
  );
}

export default App;
