import React from 'react';
import Profile from '../components/profile';
import MoreUsers from '../components/moreusers';

export default function Index() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ flex: 1 }}>
        <Profile />
      </div>
      <MoreUsers />
    </div>
  );
}
