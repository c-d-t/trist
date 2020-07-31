import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Nav from './Nav';
import DmList from '../components/dm_list';
import Discover from '../components/discover';
import Channel from '../components/channel';
import Profile from '../components/profile';
import Settings from '../components/settings';
import Relations from '../components/relations';
import RandomChatPreferences from '../components/random_chat_preferences';
import OpenChatPreferences from '../components/open_chat_preferences';
import UpgradeAccount from '../pages/forms/UpgradeForm';

import './Mobile.css';

const Mobile = () => {
  return (
    <div id="mobile-app">
    <Switch>
      <Route exact path="/upgrade" component={UpgradeAccount} />
      <Route exact path="/messages" component={DmList} />
      <Route exact path="/discover" component={Discover} />
      <Route exact path="/discover/random" component={RandomChatPreferences} />
      <Route exact path="/discover/open" component={OpenChatPreferences} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/profile/settings" component={Settings} />
      <Route exact path="/profile/friends" component={Relations} />
      <Route exact path="/profile/requests" component={null} />
      <Route exact path="/profile/blocks" component={null} />
      <Redirect to="/discover" />
    </Switch>
    <Nav />
    <Channel />
    </div>
  );
};

export default Mobile;
