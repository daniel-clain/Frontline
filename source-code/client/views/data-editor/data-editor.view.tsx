
import { observer } from 'mobx-react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Card_Data_Object, Card_Object } from "../../object-models/card.object"
import { DataService } from '../../services/data.service';
import {mainState } from '../../state/main.state'
import { is } from '../../helper-functions';
import { MainState } from '../../object-models/main-state.object';
import Data_Object from '../../object-models/data.object.super';
import { Deck_Data_Object } from '../../object-models/deck.object';
import { Faction_Data_Object } from '../../object-models/faction.object';
import { Type_Data_Object } from '../../object-models/type.object';
import { Ability_Data_Object } from '../../object-models/ability.object';
import { mainMap } from '../../map';



function createEmptyObject(type: keyof MainState): Card_Data_Object | Ability_Data_Object | Deck_Data_Object | Faction_Data_Object | Type_Data_Object
 {
  if(type == 'cards'){
    return {
      name: null,
      ability1Id: null,
      ability2Id: null,
      hp: null,
      typeId: null,
      budget: null,
      morale: null,
      factionId: null,
      armor: null
    } as Card_Data_Object
  }

  if(type == 'factions'){
    return {
      name: ''
    } as Faction_Data_Object
  }

  if(type == 'decks'){
    return {
      name: ''
    } as Faction_Data_Object
  }

  if(type == 'abilities'){
    return {
      name: ''
    } as Faction_Data_Object
  }

  if(type == 'types'){
    return {
      name: ''
    } as Faction_Data_Object
  }
}

const DataEditor_View = observer(() => {
  const [activeDataType, setActiveDataType] = useState<keyof MainState>('cards')
  const [activeDataItem, setActiveDataItem] = useState<Data_Object>(createEmptyObject(activeDataType))

  useEffect(() => {
    setActiveDataItem(createEmptyObject(activeDataType))

  }, [activeDataType])

  const dataList = mainState[activeDataType] as {id: string, name: string}[]

  return <>
    <div className='data-editor'>
      <h1>Data Editor</h1>
      <div className="data-type-selector">
        <label>{activeDataType}</label>
        <select onChange={({target}) => setActiveDataType(target.value as keyof MainState)}>
          {Object.keys(mainState)
          .map((key: keyof MainState) => 
            <option 
              key={key}
              className={is('selected').if(activeDataItem?.[key] == key)}
              value={key}
            >
              {key}
            </option>
          )}
        </select>
      </div>

      <div className="list container has-border">
        
        {dataList.map(dataItem => {
          console.log(dataItem)
          return <div 
              key={dataItem.id}
              onClick={_ => setActiveDataItem(dataItem)}
              className={is('selected').if(activeDataItem?.id == dataItem.id)}
            >
              {dataItem.name}
          </div>
        })}
      </div>

      <div className="active-data-item">
        {getActiveDataItemFields()}
        <button onClick={submitActiveDataItem}>
          {activeDataItem?.id ? 'Update' : 'Add'}
        </button>
        
        <button onClick={deleteActiveDataItem}>
          {activeDataItem?.id ? 'Delete' : 'Clear'}
        </button>
      </div>
    </div>
  </>


  // implementation

  function getActiveDataItemFields(){
    return activeDataItem && Object.keys(createEmptyObject(activeDataType)).map((cardKey:any) => {
      let field
      switch(cardKey){
        case 'ability1Id': 
        case 'ability2Id': 
        case 'factionId': 
        case 'typeId': field = getSelectField(cardKey); break
        default: field = getInputField(cardKey)
      }
      return (
        <div className="field" key={cardKey}>
          {field}
        </div>
      )
    })
  }

  function submitActiveDataItem(){
    
    const collectionString = mainMap.mainState.toCollection[activeDataType]

    activeDataItem?.id ?
      DataService.update(collectionString, activeDataItem) :
      DataService.add(mainMap.mainState.toCollection[activeDataType], activeDataItem)  

    setActiveDataItem(createEmptyObject(activeDataType))
  }

  function deleteActiveDataItem(){
    
    const collectionString = mainMap.mainState.toCollection[activeDataType]

    if(activeDataItem.id){
      DataService.deleteData(collectionString, activeDataItem)
    }      

    setActiveDataItem(createEmptyObject(activeDataType))
  }

  function getInputField(cardKey: keyof Data_Object){ 
    return <>
      <label>{cardKey}</label>
      <input 
        required
        value={is(activeDataItem?.[cardKey] || '').if(activeDataItem)}
        onChange={({target}) => 
          setActiveDataItem({...activeDataItem, [cardKey]: target.value })
        }
        onKeyUp={({code}: any) => code == 'Enter' &&  submitActiveDataItem()}
      />
    </>
  }

  function getSelectField(dataKey: keyof Data_Object){ 
    const mainList = mainState[mainMap.key.toMainState[dataKey]]
    return <>
      <label>{mainMap.idToBuilt[dataKey]}</label>
      <select>
          <option disabled selected={!activeDataItem[dataKey]}>Select {mainMap.idToBuilt[dataKey]}</option>
        {mainList.map(item => 
          <option 
            key={item.id} 
            value={item.id}
            className={is('selected').if(activeDataItem[dataKey] == item.id)}
            onSelect={({target}) => 
              console.log(target)  
            //setActiveDataItem({...activeDataItem, [cardKey]: target.value})
            }
          >
            {item.name}
          </option>
        )}
      </select>
    </>
  }
})
export default DataEditor_View