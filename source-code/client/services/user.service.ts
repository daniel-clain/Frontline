
import Document from '../interfaces/document.interface'
import { observable} from "mobx";
import { User, auth, firestore } from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/auth'

var provider = new auth.FacebookAuthProvider()


export const userService = observable({
  user: <User> null,
  requiresAuthentication: true,
  userAuthenticated: undefined,
  userDoc: <Document> null,
  showFacebookSignIn: () => {
    return auth().signInWithPopup(provider)
    .catch(error => alert(error.message))
  }
})


if(userService.requiresAuthentication){
  auth().onAuthStateChanged(u => {
    userService.user = u
    userService.userAuthenticated = !!u
    userService.userDoc = u ? firestore().collection('Users').doc(u.uid) : null
  })
}

