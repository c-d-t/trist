import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { marco } from './redux/actions/sessionActions';

import Loading from './pages/loading';
import Landing from './pages/landing';
import Main from './pages/main';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const [loggedIn, pageLoader] = useSelector((state) => [state.session.loggedIn, state.loaders.pageLoader]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(marco());
    }, 500);
  }, []);

  if (pageLoader)
  {
    return <Loading />
  }

  return (
    <div id="app">
      {loggedIn ? <Main /> : <Landing />}
    </div>
  );
}

export default App;
