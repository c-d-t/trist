import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Logo from '../imgs/trist_logo.svg';

import Nav from './nav';
import Settings from '../components/settings';
import RandomChatPreferences from '../components/random_chat_preferences';
import OpenChatPreferences from '../components/open_chat_preferences';
import Profile from '../components/profile';
import Channel from '../components/channel';
import Relations from '../components/relations';
import DmList from '../components/dm_list';


import './Desktop.css';

const Desktop = () => {
  return (
    <div id="desktop-container">
      <Switch>
        <Route exact path="/profile/settings" component={Settings} />
        <Route path="/">
          <Nav />
          <div className="content">
            <Switch>
              <Route exact path="/discover/random" component={RandomChatPreferences} />
              <Route exact path="/discover/open" component={OpenChatPreferences} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/profile/friends" component={Relations} />
              <Route exact path="/messages" component={DmList} />
              <Route path="/"><Redirect to="/discover/random" /></Route>
            </Switch>
          </div>
          <img className="background-logo" src={Logo} alt="background-logo" />
          <Channel />
        </Route>
      </Switch>
    </div>
  );
};

export default Desktop;
