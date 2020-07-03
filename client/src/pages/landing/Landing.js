import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { login } from '../../redux/actions/thisAccountActions';

import Header from '../../components/header';
import HeaderContent from '../../components/header/header_content';
import Form from '../../components/form';
import Input from '../../components/form/input';

const Landing = () => {
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const onSubmit = () => {
    return new Promise(r => setTimeout(function() {
      setDisplayName('');
      setUsername('');
      setPassword('');
      setEmail('');
      dispatch(login({ username }));
    }, 10));
  };

  return (
    <>
    <Header>
      <HeaderContent title="guest">
        <Form title="Sign in as a guest" buttonName="Begin" onSubmit={onSubmit}>
          <Input type="input" placeholder="what should we call you?" value={displayName} setValue={setDisplayName} />
        </Form>
      </HeaderContent>
      <HeaderContent title="login">
        <Form title="Login" onSubmit={onSubmit}>
          <Input type="input" placeholder="username or email" value={username} setValue={setUsername} />
          <Input type="password" placeholder="password" value={password} setValue={setPassword} />
        </Form>
      </HeaderContent>
      <HeaderContent title="register">
        <Form title="Register" onSubmit={onSubmit}>
          <Input type="input" placeholder="username" value={username} setValue={setUsername} />
          <Input type="input" placeholder="email" value={email} setValue={setEmail} />
          <Input type="password" placeholder="password" value={password} setValue={setPassword} />
        </Form>
      </HeaderContent>
    </Header>
    </>
  )
};

export default Landing;
