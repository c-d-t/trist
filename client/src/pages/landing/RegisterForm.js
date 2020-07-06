import React from 'react';

import validators from '../../validators';

import Form from '../../components/form';
import Input from '../../components/form/input';

const RegisterForm = () => {
  return (
    <Form title="Register" onSubmit={''}>
      <Input name="username" type="text" validator={validators.username} />
      <Input name="email" type="text" validator={validators.email} />
      <Input name="password" type="password" validator={validators.password} />
    </Form>
  );
};

export default RegisterForm;
