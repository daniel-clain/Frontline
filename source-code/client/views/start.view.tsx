
import * as React from 'react';
import {userService} from '../services/user.service';
import CardManagement_View from './card-management/card-management.view';
import { observer } from 'mobx-react';

const Start_View = observer(() => {
  switch (
    userService.requiresAuthentication == false || 
    userService.userAuthenticated
  ) {
    case undefined:
      return <>Checking authentication...</>
    case false:
      return <div className="facebook-login">
        Waiting for sign in with Facebook...
        <button className='Facebook-Login' onClick={userService.showFacebookSignIn}>
          Login with Facebook
        </button>
      </div>
    case true:
      return <CardManagement_View/>
  }
})
export default Start_View