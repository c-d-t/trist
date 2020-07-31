import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { upgradeAccount } from '../../redux/actions/sessionActions';
import validators from '../../validators';

import Form from '../../components/form';
import Input from '../../components/form/input';

const UpgradeForm = () => {
  const { status } = useSelector((state) => state.session.account);
  const dispatch = useDispatch();

  if (status > 0)
  {
    return <Redirect to="/" />;
  }

  return (
    <>
    <Form title="Register" onSubmit={(data) => dispatch(upgradeAccount(data))}>
      <Input name="username" type="text" validator={validators.username} />
      <Input name="email" type="text" validator={validators.email} />
      <Input name="password" type="password" validator={validators.password} />
    </Form>
    </>
  );
};

export default UpgradeForm;
