export const FORM_ERROR = 'errors:form';

export function makeFormError(defaultError)
{
  return function formError(response)
  {
    return {
      type: FORM_ERROR,
      errors: !defaultError ? response.data : { error: defaultError },
    }
  } 
}