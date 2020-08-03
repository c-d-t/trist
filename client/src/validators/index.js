import validateEmail from './email';
import validateUsername from './username';
import validatePassword from './password';

export default {
  email: validateEmail,
  username: validateUsername,
  password: validatePassword,
};
