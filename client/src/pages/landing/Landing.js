import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import LoginForm from './forms/LoginForm';
import GuestForm from './forms/GuestForm';
import RegisterForm from './forms/RegisterForm';

import './Landing.css';

const MobileLanding = () => {
  return (
    <div id="landing-container">
    <header>
      <Link to="/" id="logo">trist</Link>
      <div id="buttons">
        <Link to="/login" className="login">Login</Link>
        <Link to="/register" className="register">Register</Link>
      </div>
    </header>
    <Switch>
      <Route path="/login" component={LoginForm} />
      <Route path="/guest" component={GuestForm} />
      <Route path="/register" component={RegisterForm} />
      <Route path="/">
        <div id="landing-cover">
          <h1 className="title">trist</h1>
          <p className="subtitle">A something something bla</p>
          <Link to="/guest" className="call-of-action">
            Start!
          </Link>
        </div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>
        <div>blablablablabl</div>

      </Route>
    </Switch>
    </div>
  );
};

export default MobileLanding;
