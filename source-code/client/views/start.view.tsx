
import * as React from 'react';
import CardManagement_View from './data-editor/data-editor.view';
import { observer } from 'mobx-react';
import { Mascot_Partial } from '../partials/mascot.partial';
import {viewsSet} from '../sets/views.set';
import { mainState } from '../state/main.state';
import { UserService } from '../services/user.service';
import { MainService } from '../services/main.service';
import { is } from '../helper-functions';
import Cards_View from './data-editor/data-editor.view';
import DataEditor_View from './data-editor/data-editor.view';
import { InGame_View } from './in-game/in-game.view';

const Start_View = observer(() => {
  const {players, activeView} = mainState

  switch (
    UserService.requiresAuthentication == false || 
    UserService.userAuthenticated
  ) {
    case undefined:
      return <>Checking authentication...</>
    case false:
      return <div className="facebook-login">
        Waiting for sign in with Facebook...
        <button className='Facebook-Login' onClick={UserService.showFacebookSignIn}>
          Login with Facebook
        </button>
      </div>
    case true:
      return <div className='start-view'>
        <Mascot_Partial/>


        {viewsSet.map(view => 
          <button
            key={view}
            className={is('selected').if(mainState.activeView == view)}
            onClick={_ => mainState.activeView = view}
          >{view}</button>
        )}

        {
          activeView == 'Data Editor' ? <DataEditor_View/> :
          activeView == 'In Game' ? <InGame_View /> : 
          activeView == 'Start' ? <>
            <button onClick={MainService.readyForGame}>Ready For Game</button>
            </>

           : 'oops'
        }
      </div>
  }
})
export default Start_View