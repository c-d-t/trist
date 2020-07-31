export const CLEAR_ERRORS = 'errors: clear';
export const FORM_ERROR = 'errors:form';

export function clearErrors()
{
  return {
    type: CLEAR_ERRORS,
  };
}

export function makeFormError(defaultError)
{
  return function(response)
  {
    return {
      type: FORM_ERROR,
      errors: !defaultError ? response.data.data : { error: defaultError },
    };
  };
}
