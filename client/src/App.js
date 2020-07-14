import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useWindowDimensions } from './api/windowDimensions';

import { marco } from './redux/actions/sessionActions';

import Loading from './pages/loading';
import Landing from './pages/landing';
import Mobile from './mobile';
import Desktop from './desktop';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const [loggedIn, pageLoader] = useSelector((state) => [state.session.loggedIn, state.loaders.pageLoader]);
  const { width } = useWindowDimensions();

  useEffect(() => {
    dispatch(marco());
  }, []);

  if (pageLoader)
  {
    return <Loading />
  }

  if (!loggedIn)
  {
    return <Landing />
  }

  return (
    <div id="app">
      {width < 1024 ? <Mobile /> : <Desktop />}
    </div>
  );
}

export default App;
