export const LOGGED_IN = 'thisAccount:loggedIn';

export function login(account)
{
  return {
    type: LOGGED_IN,
    account,
  }
}
