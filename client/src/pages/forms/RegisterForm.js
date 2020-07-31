import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { register } from '../../redux/actions/sessionActions';
import validators from '../../validators';

import Form from '../../components/form';
import Input from '../../components/form/input';

const RegisterForm = () => {
  const dispatch = useDispatch();

  return (
    <>
    <Form title="Register" onSubmit={(data) => dispatch(register(data))}>
      <Input name="username" type="text" validator={validators.username} />
      <Input name="email" type="text" validator={validators.email} />
      <Input name="password" type="password" validator={validators.password} />
    </Form>
    <p className="form-text">Already have an account or want to join as a guest? <Link to="/login">login</Link> or join as a <Link to="/guest">guest</Link></p>
    </>
  );
};

export default RegisterForm;
