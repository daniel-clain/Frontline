
import { render } from 'react-dom'
import * as React from 'react';
import firebase from 'firebase/app'
import {firebaseConfigSlut} from './firebaseConfig';
import './styles/index.scss';
import 'firebase/auth'
import 'firebase/firestore'
import { observer } from 'mobx-react';
import { mainState } from './state/main.state';
import { ViewButtons_P } from './components/view-buttons.partial';
import {  useEffect } from 'react';
import { DataEditor_View } from './components/views/data-editor/data-editor.view';
import bg1 from './images/backgrounds/bg1.jpg';
import bg2 from './images/backgrounds/bg2.png';
import bg3 from './images/backgrounds/bg3.jpg';
import bg4 from './images/backgrounds/bg4.jpg';
import bg5 from './images/backgrounds/bg5.jpg';
import bg6 from './images/backgrounds/bg6.jpg';
import { mainService } from './services/main.service';
import { Play_View } from './components/views/play/play.view';
import { personService } from './services/person.service';
import { MainState } from './object-models/main-state.object';

const backgroundImages = [bg1, bg2, bg3, bg4, bg5, bg6]

const {
  showFacebookSignIn, 
  syncFirestoreData,
  getRandom
} = mainService  

const {
  onAuthenticated,
  checkIfPersonHasAccount,
  createPersonAccount
} = personService



firebase.initializeApp(firebaseConfigSlut)


const Index_C = observer(() => {
  
  const {activeView, thisPerson, decks} = mainState as MainState

  

  useEffect(() => {
    onAuthenticated(user => {
      if(user == null){
        mainState.thisPerson = null
      } else {
        mainState.userId = user.uid
        syncFirestoreData()
        checkIfPersonHasAccount(user).then(doesntExist => {
          if(doesntExist){
            createPersonAccount(user)
          }
        })
      }
    })
  }, [])
  
  if(thisPerson === undefined){
    return <>Checking authentication...</>
  }

  if(thisPerson === null){
    return <div className="facebook-login">
      Waiting for sign in with Facebook...
      <button className='Facebook-Login' onClick={showFacebookSignIn}>
        Login with Facebook
      </button>
    </div>
  }


  if(!!thisPerson){
    return <div className='frontline' >
      <img src={getRandom(backgroundImages)} className="bg-image"></img>
      <ViewButtons_P/>
      {decks.map(d => <div>{d.cardIds}</div>)}
      {
        activeView == 'Data Editor' ? <DataEditor_View/> :
        activeView == 'Play' ? <Play_View/> : 'oops'
      } 
    </div>
  }

})

const reactRenderingTag = document.createElement('react')
document.body.appendChild(reactRenderingTag)
render(<Index_C/>, reactRenderingTag)



