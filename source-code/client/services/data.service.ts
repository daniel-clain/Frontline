
import { observable, when } from 'mobx'

import {QuerySnapshot, DocumentData} from 'firestore'
import firebase from 'firebase/app'
import Data_Object from '../object-models/data.object.super'
import { DataObjects_Set } from '../sets/data-objects.set'
import { Collection_Type } from '../sets/firebase-collections.set'



export const DataService = observable({
  add,
  update,
  deleteData,
  data$
})


function data$<T extends Data_Object>(collectionName: Collection_Type, receiveDataFunc: (data: T[]) => void) {
  firebase.firestore().collection(collectionName).onSnapshot({
    next: (snapshot: QuerySnapshot<DocumentData>) =>
      receiveDataFunc(snapshot.docs.map(doc => <T>({ ...doc.data(), id: doc.id })))
  })
  
  /* if(userService.requiresAuthentication){  
    when(() => !!userService.userDoc, () => {  
      userService.userDoc.collection(collectionName).onSnapshot({
        next: (snapshot: QuerySnapshot<DocumentData>) =>
          receiveDataFunc(snapshot.docs.map(doc => <T>({ ...doc.data(), id: doc.id })))
      })
    })
  }
  else{
    firebase.firestore().collection(collectionName).onSnapshot({
      next: (snapshot: QuerySnapshot<DocumentData>) =>
        receiveDataFunc(snapshot.docs.map(doc => <T>({ ...doc.data(), id: doc.id })))
    })
  } */
}

function getCollection(dataType: Collection_Type){  
  return firebase.firestore().collection(dataType)
  /* if(userService.requiresAuthentication){ 
    return userService.userDoc.collection(dataType_collection.get(dataType))
  } 
  else {
    return firebase.firestore().collection(dataType_collection.get(dataType))
  } */
}

function add<T extends DataObjects_Set>(dataType: Collection_Type, data: T): Promise<T> {
  return getCollection(dataType).add(data)
  .then(dataRef => {    
    return dataRef.get().then((snapshot: QuerySnapshot<DocumentData>) => {
      return {...snapshot.data(), id: snapshot.id}
    })
  })
}

function update<T extends Data_Object>(collectionName: Collection_Type, data: T) {
  const { id, ...rest } = data
  return getCollection(collectionName).doc(id).update({ ...rest, dateLastUpdated: new Date() })
}

function deleteData(collectionName: Collection_Type, data: Data_Object) {
  return getCollection(collectionName).doc(data.id).delete()
}

