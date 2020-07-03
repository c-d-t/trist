import React from 'react';

import Header from '../../components/header';
import HeaderContent from '../../components/header/header_content';
import Option from '../../components/option';

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
        </HeaderContent>
      </Header>

      <div id="content-container">
        <Messages />
      </div>

      <Channel />
    </>
  );
};

export default Main;
