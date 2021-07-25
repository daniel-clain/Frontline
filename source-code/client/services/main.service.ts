
import { auth, firestore } from "firebase/app";
import { mainMap } from "../constants/objects-map";
import { Card_Data_Object, Card_Object } from "../object-models/card.object";
import Data_Object from "../object-models/data.object.super";
import { MainState } from "../object-models/main-state.object";
import { Player_Data_Object } from "../object-models/player.object";
import { collectionSet } from "../sets/firebase-collections.set";
import { mainState } from "../state/main.state";
import { dataService } from "./data.service";
import { gameService } from "./game.service";



export const mainService = {
  startReadingDataStreams,
  showFacebookSignIn,
  ifUserPlayerDoesntExistCreatePlayer,
  buildOutDataObject,
  deckIdToCards,
  convertToDataObject
}

function startReadingDataStreams(){  
  collectionSet.forEach(collection => {
    dataService.data$(collection, (dataItems: Data_Object[]) => {
      mainState[mainMap.collection.toMain[collection]] = dataItems
    })
  })
}

const facebookProvider = new auth.FacebookAuthProvider()
function showFacebookSignIn(){
  return auth().signInWithPopup(facebookProvider)
  .catch(error => alert(error.message))
}

function convertToDataObject<Built_Object, Data_Object>(builtObject: Built_Object): Data_Object{
  const dataObject = Object.keys(builtObject)
  .reduce((dataObject: Data_Object, key)  => {
    const isIdKey = false
    if(isIdKey){
      const mainList: Data_Object[] = mainState[mainMap.built.toId[key]]
      const newKey = mainMap.id.toBuilt[key]
      dataObject[newKey] = mainList

    } else {
      dataObject[key] = builtObject[key]
    }
    return dataObject
  }, {} as Data_Object)

  return dataObject 

}


function buildOutDataObject<Data_Object, Built_Object>(dataObject: Data_Object): Built_Object{
  const builtObject = Object.keys(dataObject)
  .reduce((builtObject: Built_Object, key)  => {
    const isIdKey = Object.keys(mainMap.id.toMainState).includes(key)
    if(isIdKey){
      const mainList: Data_Object[] = mainState[mainMap.id.toMainState[key as keyof MainState]]
      const newKey = mainMap.id.toBuilt[key ]
      builtObject[newKey] = mainList

    } else {
      builtObject[key] = dataObject[key]
    }
    return builtObject
  }, {} as Built_Object)

  return builtObject
}

function ifUserPlayerDoesntExistCreatePlayer(){
  const {uid} = mainState.user
  firestore().collection('Players')
  .where("userId", "==", uid).get()
  .then(({docs}) => {
    const noPlayersWithUserId = !docs.length
    if(noPlayersWithUserId){
      dataService.add('Players',{
        name: 'Default Player Name',
        userId: uid,
        activeDeckId: null,
        deckIds: []
      } as Player_Data_Object)
    }
  })
}

function deckIdToCards(deckId): Card_Object[]{
  return mainState
  .decks.find(d => deckId == d.id)
  .cardIds.map(cardId => mainState.cards.find(c => cardId == c.id))
  .map(c => buildOutDataObject<Card_Data_Object, Card_Object>(c))
}





