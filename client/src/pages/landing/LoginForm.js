import React from 'react';

import { login } from '../../api/axios';

import Form from '../../components/form';
import Input from '../../components/form/input';

const LoginForm = () => {
  return (
    <Form title="Login" onSubmit={login}>
      <Input name="usernameOrEmail" type="text" placeholder="username or email" />
      <Input name="password" type="password" />
    </Form>
  );
};

export default LoginForm;
