import React from 'react';

import validators from '../../validators';

import Form from '../../components/form';
import Input from '../../components/form/input';

const GuestForm = () => {
  return (
    <Form title="Sign in as a guest" buttonName="Begin" onSubmit={''}>
      <Input name="displayName" placeholder="what should we call you?" type="text" validator={validators.displayName} />
    </Form>
  );
};

export default GuestForm;
