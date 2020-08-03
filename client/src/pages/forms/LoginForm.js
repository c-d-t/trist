import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { login } from '../../redux/actions/sessionActions';

import Form from '../../components/form';
import Input from '../../components/form/input';

const LoginForm = () => {
  const dispatch = useDispatch();

  return (
    <>
    <Form title="Login" onSubmit={(data) => dispatch(login(data))}>
      <Input name="email" type="text" placeholder="email" />
      <Input name="password" type="password" />
    </Form>
    <p className="form-text">Don't have an account? <Link to="/register">register</Link> or join as a <Link to="/guest">guest</Link></p>
    </>
  );
};

export default LoginForm;
