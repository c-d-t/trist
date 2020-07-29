import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { AiFillQuestionCircle, AiFillCode, AiFillCloseCircle } from 'react-icons/ai';

import Logo from '../../imgs/trist_logo.svg';

import LoginForm from './forms/LoginForm';
import GuestForm from './forms/GuestForm';
import RegisterForm from './forms/RegisterForm';

import './Landing.css';

const MobileLanding = () => {
  return (
    <div id="landing-container">
    <header className="container">
      <Link to="/" id="logo"><img src={Logo} alt="Trist Logo" />trist</Link>
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
          <h2 className="subtitle">A safe and modern platform for meeting new people from around the world.</h2>
          <Link to="/guest" className="call-of-action">
            <p>Start!</p>
          </Link>
        </div>
        <div id="features" className="container">
          <div>
            <h2>Meet People Safely</h2>
            <p>Our main priority is to provide a platform which users feel safe using and we provide the tools for you to do so.</p>
          </div>
          <div>
            <h2>Make Friends</h2>
            <p>We have everything you need to keep in touch with the people you meet. Making friends is now as easy as a click of a button.</p>
          </div>
          <div>
            <h2>No Registration</h2>
            <p>You don't need to register to use Trist. You can simply hop on and start using all the features as everyone else.</p>
          </div>
        </div>
        <div id="about" className="container">
          <h2><AiFillQuestionCircle style={{ color: '0d6' }} />What Trist Is</h2>
          <p>
            Every chatting app out there has the same problems. They are filled to the brim with degenerates, scammers, bots, and trolls.
            Despite this, you will always be able to find a minority of people who put up with these issues to be able to chat with each other.
            Trist was made for that minority who just want to chat without dealing with the thousands of people who make chatting apps bad.
          </p>
          <h2><AiFillCloseCircle style={{ color: 'f55' }} />What Trist Isn't</h2>
          <p>
            Trist isn't for dating or hooking up. There are millions of other places for doing that.
          </p>
        </div>
        <div id="open-source" className="container">
          <h2><AiFillCode style={{ color: '111' }} />Open Source</h2>
          <p>
            What does open source mean? It means all the code that makes Trist churn is completely public. You can go and see it 
            <a href="https://github.com/c-d-t/trist"> right now </a> if you wanted to.
            You can see exactly what we do with your data(nothing) and even add never-before-seen features if you want.
          </p>
        </div>
        <footer className="container">
          <img src={Logo} alt="Trist logo" />
          2020 &copy; Trist
        </footer>
      </Route>
    </Switch>
    </div>
  );
};

export default MobileLanding;
