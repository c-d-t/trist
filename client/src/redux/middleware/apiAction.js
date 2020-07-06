import axios from 'axios';
import { API, apiError, apiStart, apiEnd } from '../actions/apiActions';

const apiAction = ({ dispatch }) => (next) => (action) => {
  next(action);

  if (action.type !== API) return;

  const {
    url,
    method,
    data,
    onSuccess,
    onFailure,
    label,
  } = action.payload;

  if (label)
  {
    dispatch(apiStart(label))
  }

  axios.request({
    url,
    method,
    data,
  })
  .then(({ data }) => {
    dispatch(onSuccess(data));
  })
  .catch((error) => {
    dispatch(apiError(error));
    dispatch(onFailure(error));
  })
  .finally(() => {
    if (label)
    {
      dispatch(apiEnd(label))
    }
  });
}

export default apiAction;
