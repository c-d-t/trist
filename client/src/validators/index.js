import validateEmail from './email';
import validateUsername from './username';
import validatePassword from './password';
import validateDisplayName from './displayName';

export default {
  email: validateEmail,
  username: validateUsername,
  password: validatePassword,
  displayName: validateDisplayName,
};
