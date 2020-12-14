import React from 'react';
import Header from './Header';

function WelcomePage(props) {
  return (
    <div>
        <Header
        isSignedIn={true}
        onLogOutClick={() => {
          props.handleLogOut();
        }}
      />
    </div>
  )
}

export default WelcomePage
