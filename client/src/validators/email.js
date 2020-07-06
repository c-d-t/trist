function validatePassword(string)
{
  const basicEmailRegex = /^[^@\s]+@[^@\s.]+\.[^@.\s]+$/;
  if(!basicEmailRegex.test(string))
  {
    return 'Email is not valid.';
  }

  return '';
}

export default validatePassword;
