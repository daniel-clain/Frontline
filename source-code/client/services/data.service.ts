
import { observable } from 'mobx'

import Data from '../object-models/data-objects/data.object.super'
import {QuerySnapshot, DocumentData} from 'firestore'
import { Collection_Type } from '../sets/firebase-collections.set'
import { firestore } from 'firebase/app'
import { Card_Data, Card } from '../object-models/data-objects/card.object'
import { Deck_Data, Deck } from '../object-models/data-objects/deck.object'
import { GameConfig, Game_Data } from '../object-models/data-objects/game.object'
import { Person, Person_Data } from '../object-models/data-objects/person.object'
import { mainMap } from '../constants/objects-map'
import { GameConfig_Data } from '../object-models/data-objects/game-config.object'
import { mainState } from '../state/main.state'



export const dataService = observable({
  add,
  update,
  deleteData,
  data$,
  getData,
  getCollectionData,
  getCollection,

  /* buildOutGame, */
  buildOutCard,
  buildOutDeck,
  buildOutPerson,

  /* toGameData, */
  toCardData,
  toPersonData,
  toDeckData,


})

export type DataX = Game_Data | Card_Data | Deck_Data | Person_Data

async function getData<T extends Data>(collectionName: Collection_Type, id: string): Promise<T> {
  return new Promise(res => {
    firestore().collection(collectionName).doc(id).get()
    .then(doc => res({...doc.data(), id: doc.id} as T))
  })
}

async function getCollectionData(collectionName: Collection_Type) {
  return getCollection(collectionName).get()
  .then((snapshot: QuerySnapshot<DocumentData>) => 
    snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
  )
}

function data$<T extends Data>(collectionName: Collection_Type, receiveDataFunc: (data: T[]) => void) {
  firestore().collection(collectionName).onSnapshot({
    next: (snapshot: QuerySnapshot<DocumentData>) =>
      receiveDataFunc(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
  })
}

function getCollection(collectionName: Collection_Type){  
  return firestore().collection(collectionName)
}

function add<T extends Data>(collectionName: Collection_Type, data: Omit<T, 'id'>): Promise<T> {
  return getCollection(collectionName).add(data)
  .then(dataRef => {    
    return dataRef.get().then((snapshot: QuerySnapshot<DocumentData>) => {
      return {...snapshot.data(), id: snapshot.id}
    })
  })
}

function update<T extends Data>(collectionName: Collection_Type, data: T) {
  const { id, ...rest } = data
  return getCollection(collectionName).doc(id).update({ ...rest, dateLastUpdated: new Date() })
}

function deleteData(collectionName: Collection_Type, data: Data) {
  return getCollection(collectionName).doc(data.id).delete()
}




/* function buildOutGame(game: Game_Data): Game{
  return buildOutObject<Game_Data, Game>(game)
} */
function buildOutCard(card: Card_Data): Card{
  return buildOutObject<Card_Data, Card>(card)
}
function buildOutDeck(deck: Deck_Data): Deck{
  return buildOutObject<Deck_Data, Deck>(deck)
}
function buildOutPerson(person: Person_Data): Person{
  return buildOutObject<Person_Data, Person>(person)
}


/**
 * 
 * Recursively drills down into an objects properties, whenever it finds a properties in the build out map, it will build out that object as well until all raw data objects are built out.
 */
 function buildOutObject<T_Data, T_Built>(object: T_Data): T_Built{
  if(!object) return null
  let returnObject = {} as T_Built
  loopThroughObjectProperties(object, property => {
    if(propertyIsAnIdReference(property)){
      const idProperty = property
      const builtKey = mainMap.id.toBuilt[idProperty]
      const mainStateKey = mainMap.id.toMainState[idProperty]
      if(propertyIsAnArray(idProperty)){
        returnObject[builtKey] = (
          object[idProperty].map(id => 
            buildOutObject(
              mainState[mainStateKey].find(obj => obj.id == id)
            )
          )
        )
      } else {
        returnObject[builtKey] = buildOutObject(
          mainState[mainStateKey].find(obj => obj.id == object[idProperty])
        )
      }
    } else {
      returnObject[property] = object[property]
    }
  })

  return returnObject

  function loopThroughObjectProperties(object, action){
    Object.keys(object).forEach(action)
  }
  function propertyIsAnIdReference(property){
    return Object.keys(mainMap.id.toBuilt).includes(property)
  }
  function propertyIsAnArray(property){
    return Array.isArray(object[property])
  }
}

/* function toGameData(game: Game): Game_Data{
  return toObjectData<Game, Game_Data>(game)
} */
function toCardData(card: Card): Card_Data{
  return toObjectData<Card, Card_Data>(card)
}
function toPersonData(person: Person): Person_Data{
  return toObjectData<Person, Person_Data>(person)
}
function toDeckData(deck: Deck): Deck_Data{
  return toObjectData<Deck, Deck_Data>(deck)
}

function toObjectData<T_Built, T_Data>(object: T_Built): T_Data{
  let returnObject = {} as T_Data
  loopThroughObjectProperties(object, property => {
    if(propertyIsABuiltReference(property)){
      if(propertyIsAnArray(property)){
        returnObject[property] = object[property].map(item => item.id
        )
      } else {
        returnObject[property] = object[property].id
      }
    } else {
      returnObject[property] = object[property]
    }
  })

  return returnObject

  function loopThroughObjectProperties(object, action){
    Object.keys(object).forEach(action)
  }
  function propertyIsABuiltReference(property){
    return Object.keys(mainMap.built.toId).includes(property)
  }
  function propertyIsAnArray(property){
    return Array.isArray(object[property])
  }
}