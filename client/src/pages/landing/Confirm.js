import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { confirmEmail } from '../../redux/actions/sessionActions';

const Confirm = ({ match }) => {
  const { token } = match.params;
  const dispatch = useDispatch();
  const confirmedEmail = useSelector((state) => state.session.confirmedEmail);

  useEffect(() => {
    dispatch(confirmEmail(token));
  }, []);

  return (
    <div className="box">
      {confirmedEmail ? (
        <>
        <h2>You're All Set!</h2>
        <p>You can now <a href="/login">login</a> to Trist. We hope you enjoy your time here.</p>
        </>
      ) : (
        <>
        <h2>Hold On</h2>
        <p>This should only take a few seconds...</p>
        <p className="small">Something went wrong if you still have time to read this.</p>
        </>
      )}
    </div>
  )
}

export default Confirm;
