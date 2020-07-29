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
    onFailure = (err) => { console.log(err); return { type: 'do_nothing' }; },
    label,
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
  })
  .then(({ data }) => {
    dispatch(onSuccess(data.data));
  })
  .catch((error) => {
    console.log(error.response)
    if (!!error.response && error.response.status === 403) return dispatch({ type: LOGGED_OUT });
    if (!!error.response && !!error.response.data)
    {
      dispatch(apiError(error.response.data));
      dispatch(onFailure(error.response.data));
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
