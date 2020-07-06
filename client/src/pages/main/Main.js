import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from '../../components/header';
import HeaderContent from '../../components/header/header_content';
import Option from '../../components/option';
import WarningButton from '../../components/warning_button';

import ComingSoon from '../../components/coming_soon_tm';
import Messages from '../../components/messages';

import Channel from '../../components/channel';

import './Main.css';

const Main = () => {
  return (
    <>
      <Header>
        <HeaderContent title="Home">
          <Option title="Feed" />
          <Option title="Messages" />
        </HeaderContent>
        <HeaderContent title="Meet">
          <Option title="Random Chat" />
          <Option title="Open Chat" />
        </HeaderContent>
        <HeaderContent title="Profile">
          <Option title="Settings" />
          <Option title="Friends" />
          <WarningButton text="Logout" color="#f00" onClick={() => alert('logged out')} />
        </HeaderContent>
      </Header>

      <div id="content-container">
        <Switch>
          <Route path="/feed" component={ComingSoon} />
          <Route path="/messages" component={Messages} />
          <Redirect to="/feed" />
        </Switch>
      </div>

      <Channel />
    </>
  );
};

export default Main;
