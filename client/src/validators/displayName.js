function validateDisplayName(string)
{
  if (string.length > 40)
  {
    return 'A display name has a maximum of 40 characters.';
  }

  return '';
}

export default validateDisplayName;
