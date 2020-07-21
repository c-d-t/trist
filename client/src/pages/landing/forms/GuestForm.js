import React from 'react';

import validators from '../../../validators';

import Form from '../../../components/form';
import Input from '../../../components/form/input';

const onSubmit = () => {
  alert('Entering as a guest is currently disabled.');
};

const GuestForm = () => {
  return (
    <Form title="What should we call you?" buttonName="Begin" onSubmit={onSubmit}>
      <Input name="displayName" placeholder="You can change your name at any time." type="text" validator={validators.displayName} />
    </Form>
  );
};

export default GuestForm;
