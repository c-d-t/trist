import React, { useEffect } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useWindowDimensions } from './api/windowDimensions';

import { marco } from './redux/actions/sessionActions';
import { createNotification } from './redux/actions/notificationActions';

import Confirm from './pages/confirm';
import PopUpNotif from './components/pop_up_notif';
import Loading from './pages/loading';
import Landing from './pages/landing';
import Mobile from './mobile';
import Desktop from './desktop'; 

import './App.css';

const App = () => {
  return (
    <Switch>
      <Route exact path="/confirm/:token" component={Confirm} />
      <Route path="/">
        <Base />
      </Route>
    </Switch>
  )
}

const Base = () => {
  const dispatch = useDispatch();
  const [session, pageLoader] = useSelector((state) => [state.session, state.loaders.pageLoader]);
  const { width } = useWindowDimensions();

  useEffect(() => {
    dispatch(marco());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const warnGuest = () => {
      dispatch(createNotification('You are using a guest account. Keep your account by upgrading it. Profile>Settings>Account>Upgrade'));
    };
    let intervalId;
    if (session.account && session.account.status === 0)
    {
      intervalId = setInterval(warnGuest, 1000 * 60 * 15 ); // every 15 minutes
    }
    return () => {
      if (!!intervalId)
      {
        clearInterval(warnGuest);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  if (pageLoader)
  {
    return <Loading />
  }

  if (!session.loggedIn)
  {
    return <Landing />
  }

  if (session.confirmingEmail)
  {
    return <Redirect to="/" />;
  }

  return (
    <>
    <PopUpNotif />
    {width < 1024 ? <Mobile /> : <Desktop />}
    </>
  );
}

export default App;
