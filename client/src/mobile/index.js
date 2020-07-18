import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Nav from './Nav';
import DmList from '../components/dm_list';
import Discover from '../components/discover';
import Channel from '../components/channel';
import Profile from '../components/profile';

import './Mobile.css';

const Mobile = () => {
  return (
    <>
    <Switch>
      <Route path="/messages" component={DmList} />
      <Route path="/discover" component={Discover} />
      <Route path="/profile" component={Profile} />
      <Redirect to="/discover" />
    </Switch>
    <Nav />
    <Channel />
    </>
  );
};

export default Mobile;
