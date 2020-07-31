import React from 'react';
import { useDispatch } from 'react-redux';

import { registerAsGuest } from '../../redux/actions/sessionActions';
import validators from '../../validators';

import Form from '../../components/form';
import Input from '../../components/form/input';


const GuestForm = () => {
  const dispatch = useDispatch();

  return (
    <Form title="What should we call you?" buttonName="Begin" onSubmit={(data) => dispatch(registerAsGuest(data))}>
      <Input name="displayName" placeholder="You can change your name at any time." type="text" validator={validators.displayName} />
    </Form>
  );
};

export default GuestForm;
