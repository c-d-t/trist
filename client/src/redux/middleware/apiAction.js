import axios from 'axios';
import { API, apiError, apiStart, apiEnd } from '../actions/apiActions';
import { LOGGED_OUT } from '../actions/sessionActions';

const apiAction = ({ dispatch }) => (next) => (action) => {
  next(action);

  if (action.type !== API) return;

  const {
    url,
    method,
    data = {},
    onSuccess = () => { return { type: 'nothing' } },
    onFailure = (err) => { return { type: 'do_nothing' }; },
    label,
    file,
  } = action.payload;

  if (label)
  {
    dispatch(apiStart(label))
  }

  const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";

  axios.request({
    url,
    method,
    [dataOrParams]: data,
    headers: !file ? undefined : { 'Content-Type': 'multipart/form-data' },
  })
  .then(({ data }) => {
    dispatch(onSuccess(data));
  })
  .catch((error) => {
    if (!!error.response && error.response.status === 403) return dispatch({ type: LOGGED_OUT });
    if (!!error.response && !!error.response.data)
    {
      dispatch(apiError(error.response));
      dispatch(onFailure(error.response));
    }
  })
  .finally(() => {
    if (label)
    {
      dispatch(apiEnd(label))
    }
  });
}

export default apiAction;
