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
    <div style={{ width: '100%' }}>
    <Form title="Upgrade" onSubmit={(data) => dispatch(upgradeAccount(data))}>
      <Input name="email" placeholder="email (No one but you will be able to see this)" type="text" validator={validators.email} />
      <Input name="password" type="password" validator={validators.password} />
    </Form>
    </div>
  );
};

export default UpgradeForm;
