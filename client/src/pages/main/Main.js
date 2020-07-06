import React from 'react';

import Header from '../../components/header';
import HeaderContent from '../../components/header/header_content';
import Option from '../../components/option';

import ComingSoon from '../../components/coming_soon_tm';

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
        <ComingSoon />
      </div>

      <Channel />
    </>
  );
};

export default Main;
