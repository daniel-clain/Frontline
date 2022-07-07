import { auth, firestore, User } from "firebase";
import { dataObjects } from "../constants/data-object-keys.constant";
import { Person_Data, Person } from "../object-models/data-objects/person.object";
import { dataService } from "./data.service";
import { mainService } from "./main.service";



export const personService = {
  onAuthenticated,
  checkIfPersonHasAccount,
  createPersonAccount
}


function onAuthenticated(action: (user: User) => void){
  auth().onAuthStateChanged(user => {

    if(user === null){
      action(null)
    } else if(!user){
      action(undefined)    
    } else {
      action(user)
    }
  })

}

async function checkIfPersonHasAccount(user: User){
  return firestore().collection('People').doc(user.uid).get()
  .then(personDoc => !personDoc.exists)
}

function createPersonAccount(user: User) {
  dataService.getCollection('People').doc(user.uid).set({
    ...dataObjects.person,
    name: user.displayName
  })
}