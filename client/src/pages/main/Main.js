import React from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import { logout } from '../../redux/actions/sessionActions';

import Header from '../../components/header';
import HeaderContent from '../../components/header/header_content';
import Option from '../../components/option';
import WarningButton from '../../components/warning_button';

import ComingSoon from './coming_soon_tm';
import Messages from './messages';
import Friends from './friends';

import Channel from '../../components/channel';

import './Main.css';

const Main = () => {
  const dispatch = useDispatch();

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
          <Option title="Friends" />
          <Option title="Settings" />
          <WarningButton text="Logout" color="#f44" onClick={() => dispatch(logout())} />
        </HeaderContent>
      </Header>

      <div id="content-container">
        <Switch>
          <Route path="/feed" component={ComingSoon} />
          <Route path="/messages" component={Messages} />
          <Route path="/friends" component={Friends} />
          <Redirect to="/feed" />
        </Switch>
      </div>

      <Channel />
    </>
  );
};

export default Main;
