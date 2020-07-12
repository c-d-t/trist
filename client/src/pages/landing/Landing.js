import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';

import Header from '../../components/header';
import HeaderContent from '../../components/header/header_content';

import GuestForm from './GuestForm';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Landing = () => {
  const { pathname } = useLocation();
  if (pathname !== '/')
  {
    return <Redirect to="/" />;
  }

  return (
    <Header>
      <HeaderContent title="guest">
        <GuestForm />
      </HeaderContent>
      <HeaderContent title="login">
        <LoginForm />
      </HeaderContent>
      <HeaderContent title="register">
        <RegisterForm />
      </HeaderContent>
    </Header>
  );
};

export default Landing;
