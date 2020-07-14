import React from 'react';
import { Link } from 'react-router-dom';

import validators from '../../../validators';

import Form from '../../../components/form';
import Input from '../../../components/form/input';

const onSubmit = () => {
  alert('Registering is disabled during initial release.');
};

const RegisterForm = () => {
  return (
    <>
    <Form title="Register" onSubmit={onSubmit}>
      <Input name="username" type="text" validator={validators.username} />
      <Input name="email" type="text" validator={validators.email} />
      <Input name="password" type="password" validator={validators.password} />
    </Form>
    <p className="form-text">Already have an account or want to join as a guest? <Link to="/login">login</Link> or join as a <Link to="/guest">guest</Link></p>
    </>
  );
};

export default RegisterForm;
