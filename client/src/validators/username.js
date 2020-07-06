function validateUsername(string)
{
  if (string.length < 3 || string.length > 20)
  {
    return 'A username must be between 3 and 20 characters long.';
  }

  if (/[^\w]/.test(string))
  {
    return 'A username can only contain letters, numbers, and underscores.';
  }

  return '';
}

export default validateUsername;
