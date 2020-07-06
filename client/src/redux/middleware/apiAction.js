import axios from 'axios';
import { API } from '../actions/types';
import { apiError, apiStart, apiEnd } from '../actions/api';

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
    console.log(error);
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
