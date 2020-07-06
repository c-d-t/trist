import React from 'react';
import { useDispatch } from 'react-redux';

import { login } from '../../redux/actions/sessionActions';

import Form from '../../components/form';
import Input from '../../components/form/input';

const LoginForm = () => {
  const dispatch = useDispatch();

  return (
    <Form title="Login" onSubmit={(data) => dispatch(login(data))}>
      <Input name="usernameOrEmail" type="text" placeholder="username or email" />
      <Input name="password" type="password" />
    </Form>
  );
};

export default LoginForm;
