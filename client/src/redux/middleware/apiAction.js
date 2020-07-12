import axios from 'axios';
import { API, apiError, apiStart, apiEnd } from '../actions/apiActions';

const apiAction = ({ dispatch }) => (next) => (action) => {
  next(action);

  if (action.type !== API) return;

  const {
    url,
    method,
    data = {},
    onSuccess,
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
    dispatch(apiError(error.response));
    dispatch(onFailure(error.response));
  })
  .finally(() => {
    if (label)
    {
      dispatch(apiEnd(label))
    }
  });
}

export default apiAction;
