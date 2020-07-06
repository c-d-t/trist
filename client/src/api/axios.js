import axios from 'axios';
import store from '../redux/store';
import { login as loginAction } from '../redux/actions/sessionActions';

export async function login({ usernameOrEmail, password })
{
  try {
    await axios.post('/account/login', { usernameOrEmail, password });
    store.dispatch(loginAction({ username: 'test' }));
  }
  catch(e)
  {
    return e;
  }
}
