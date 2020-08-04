import React from 'react';
import { useSelector } from 'react-redux';

import ThisProfile from './this_profile';
import OtherProfile from './other_profile';

import './Profile.css';

const Profile = ({ match }) => {
  const { accountId } = match.params;
  const [thisAccountId] = useSelector((state) => [state.session.account.id, state.loaders.profileLoader]);

  return (
    <div id="profile-container">
      <div id="profile-header">
        {accountId === thisAccountId ? <ThisProfile /> : <OtherProfile accountId={accountId} />}
      </div>
    </div>
  );
};

export default Profile;
