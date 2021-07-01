
import { render } from 'react-dom'
import * as React from 'react';
import {Suspense, lazy} from 'react';
import firebase from 'firebase/app'
import {firebaseConfigSlut} from './firebaseConfig';
import './styles/index.scss';

firebase.initializeApp(firebaseConfigSlut)
const reactRenderingTag = document.createElement('react')
document.body.appendChild(reactRenderingTag)

const Start_View = lazy(() => import('./views/start.view'))
render(
  <Suspense fallback={<div>Loading...</div>}>
    <Start_View/>
  </Suspense>, 
  reactRenderingTag
)


