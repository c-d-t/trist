function validatePassword(string)
{
  if (string.length < 8)
  {
    return 'A password must have at least 8 characters.';
  }

  return '';
}

export default validatePassword;
