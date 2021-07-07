
import { render } from 'react-dom'
import * as React from 'react';
import firebase, { auth, firestore } from 'firebase/app'
import {firebaseConfigSlut} from './firebaseConfig';
import './styles/index.scss';
import 'firebase/auth'
import 'firebase/firestore'
import { observer } from 'mobx-react';
import { mainState } from './state/main.state';
import { ViewButtons_P } from './partials/view-buttons.partial';
import { lazy, Suspense, useEffect } from 'react';
import { DataEditor_View } from './views/data-editor/data-editor.view';
import { InGame_View } from './views/in-game/in-game.view';
import { Start_View } from './views/start.view';
import bg1 from './images/backgrounds/bg1.jpg';
import bg2 from './images/backgrounds/bg2.png';
import bg3 from './images/backgrounds/bg3.jpg';
import bg4 from './images/backgrounds/bg4.jpg';
import bg5 from './images/backgrounds/bg5.jpg';
import bg6 from './images/backgrounds/bg6.jpg';
import { mainService } from './services/main.service';
import { randomNumber } from './helper-functions';

const backgroundImags = [bg1, bg2, bg3, bg4, bg5, bg6]
firebase.initializeApp(firebaseConfigSlut)
const reactRenderingTag = document.createElement('react')
document.body.appendChild(reactRenderingTag)

auth().onAuthStateChanged(user => {
  mainState.userDoc = user ? 
    firestore().collection('Users').doc(user.uid) : 
    null
  mainState.user = user
})



const Index_C = observer(() => {
  const {activeView, user} = mainState  

  useEffect(() => {
    mainService.startReadingDataStreams()
  }, [user])

  const provider = new auth.FacebookAuthProvider()
  const showFacebookSignIn = () => {
    return auth().signInWithPopup(provider)
    .catch(error => alert(error.message))
  }

  
  if(user === undefined){
    return <>Checking authentication...</>
  }

  if(user === null){
    return (
      <div className="facebook-login">
        Waiting for sign in with Facebook...
        <button className='Facebook-Login' onClick={showFacebookSignIn}>
          Login with Facebook
        </button>
      </div>
    )
  }

  if(!!user){
    return <div className='frontline' >
      {getRandomBackgroundImage()}      
      <ViewButtons_P/>
      {
        activeView == 'Data Editor' ? <DataEditor_View/> :
        activeView == 'In Game' ? <InGame_View /> : 
        activeView == 'Start' ? <Start_View/> :  'oops'
      } 
    </div>
  }

  function getRandomBackgroundImage(){
    const randomIndex = randomNumber({from: 0, to: 5})
    console.log('randomIndex :>> ', randomIndex);
    const randomBgImage = backgroundImags[randomIndex]
    return <img src={randomBgImage} className="bg-image"></img>
  }
})

render(<Index_C/>, reactRenderingTag)



