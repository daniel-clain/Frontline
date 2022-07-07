
import { auth } from "firebase/app";
import { mainMap } from "../constants/objects-map";
import { Card_Data, Card } from "../object-models/data-objects/card.object";
import Data from "../object-models/data-objects/data.object.super";
import { MainState } from "../object-models/main-state.object";
import { collectionSet } from "../sets/firebase-collections.set";
import { mainState } from "../state/main.state";
import { dataService } from "./data.service";
import { randomNumber } from "../../helper-functions";
import { personService } from "./person.service";
import { GameConfig_Data } from "../object-models/data-objects/game-config.object";
import { dataObjects } from "../constants/data-object-keys.constant";
import { Game_Data } from "../object-models/data-objects/game.object";
import { Deck_Data, Deck } from "../object-models/data-objects/deck.object";
import { Person_Data, Person } from "../object-models/data-objects/person.object";


export const mainService = {
  syncFirestoreData,
  showFacebookSignIn,
  getRandom
}

async function syncFirestoreData(){  
  collectionSet.forEach(collection => {
    console.log('getting data for ', collection);
    dataService.data$(collection, (dataItems: Data[]) => {
      console.log('got data for ', collection);
      if(collection == 'People'){
        console.log('people data is: ', dataItems);
      }
      mainState[mainMap.collection.toMain[collection]] = dataItems
    })
  })

  const gameConfigs = await dataService.getCollectionData('Game Configs')
  if(!gameConfigs.length){
    dataService.add<GameConfig_Data>('Game Configs',  
      dataObjects.gameConfig
    )
  }
}



const facebookProvider = new auth.FacebookAuthProvider()
function showFacebookSignIn(){
  return auth().signInWithPopup(facebookProvider)
  .catch(error => alert(error.message))
}


function getRandom<T>(array: T[]): T{
  const randomIndex = randomNumber({from: 0, to: array.length - 1})
  const randomItem = array[randomIndex]
  return randomItem
}



