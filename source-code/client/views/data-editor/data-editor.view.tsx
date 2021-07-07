
import { observer } from 'mobx-react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Card_Data_Object, Card_Object } from "../../object-models/card.object"
import { dataService } from '../../services/data.service';
import {mainState } from '../../state/main.state'
import { is } from '../../helper-functions';
import { MainState } from '../../object-models/main-state.object';
import Data_Object from '../../object-models/data.object.super';
import { Deck_Data_Object } from '../../object-models/deck.object';
import { Faction_Data_Object } from '../../object-models/faction.object';
import { Type_Data_Object } from '../../object-models/type.object';
import { Ability_Data_Object } from '../../object-models/ability.object';
import { mainMap } from '../../map';
import { collectionSet, Collection_Type } from '../../sets/firebase-collections.set';
import { Game_Data_Object } from '../../object-models/game.object';
import { Player_Data_Object } from '../../object-models/player.object';



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
      name: null
    } as Faction_Data_Object
  }

  if(type == 'decks'){
    return {
      name: '',
      cardIds: []
    } as Deck_Data_Object
  }

  if(type == 'abilities'){
    return {
      name: ''
    } as Ability_Data_Object
  }

  if(type == 'types'){
    return {
      name: ''
    } as Type_Data_Object
  }
  if(type == 'players'){
    return {
      name: ''
    } as Player_Data_Object
  }
  if(type == 'games'){
    return {
    } as Game_Data_Object
  }
}

export const DataEditor_View = observer(() => {
  const [activeDataType, setActiveDataType] = useState<keyof MainState>('cards')
  const [activeDataItem, setActiveDataItem] = useState<Data_Object>(createEmptyObject(activeDataType))

  useEffect(() => {
    setActiveDataItem(createEmptyObject(activeDataType))

  }, [activeDataType])

  const dataList = mainState[activeDataType] as {id: string, name: string}[]

  return <>
    <div className='data-editor-view view'>
      
      <h1>Data Editor</h1>

      <select 
        className="data-type-selector"
        onChange={({target}) => {
          setActiveDataItem(createEmptyObject(target.value as keyof MainState))
          setActiveDataType(target.value as keyof MainState)
          
        }}
      >
        {collectionSet
        .map((key: Collection_Type) => 
          <option 
            key={key}
            className={is('selected').if(activeDataItem?.[key] == key)}
            value={mainMap.collection.toMain[key]}
          >
            {key}
          </option>
        )}
      </select>

      <div className="list container has-border">
        
        {dataList.map(dataItem => {
          return <div 
              key={dataItem.id}
              onClick={_ => setActiveDataItem(dataItem)}
              className={is('selected').if(activeDataItem?.id == dataItem.id)}
            >
              {dataItem.name || dataItem.id}
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

        {activeDataItem?.id ? 
          <button onClick={_ => setActiveDataItem(createEmptyObject(activeDataType))}>
            Unselect
          </button>
        : ''}
      </div>
    </div>
  </>


  // implementation


  function getActiveDataItemFields(){
    return activeDataItem && Object.keys(createEmptyObject(activeDataType)).map((cardKey:any) => {

      const isSelectField = [
        'cardIds','ability1Id', 'ability2Id', 'factionId', 'typeId'
      ].includes(cardKey)

      return (
        <div className="field" key={cardKey}>
          {isSelectField ? 
            getSelectField(cardKey) :
            getInputField(cardKey)
          }
        </div>
      )
    })
  }

  function submitActiveDataItem(){
    
    const collectionString = mainMap.mainState.toCollection[activeDataType]

    activeDataItem?.id ?
      dataService.update(collectionString, activeDataItem) :
      dataService.add(mainMap.mainState.toCollection[activeDataType], activeDataItem)  

    setActiveDataItem(createEmptyObject(activeDataType))
  }

  function deleteActiveDataItem(){
    
    const collectionString = mainMap.mainState.toCollection[activeDataType]

    if(activeDataItem.id){
      dataService.deleteData(collectionString, activeDataItem)
    }      

    setActiveDataItem(createEmptyObject(activeDataType))
  }

  function getInputField(dataKey: string){ 
    return <>
      <label>{dataKey}</label>
      <input 
        required
        value={
          is(activeDataItem?.[dataKey] || '').if(activeDataItem)
          
        }
        onChange={({target}) => 
          setActiveDataItem({...activeDataItem, [dataKey]: target.value })
        }
        onKeyUp={({code}: any) => code == 'Enter' &&  submitActiveDataItem()}
      />
    </>
  }

  function getSelectField(dataKey: string){ 
    const mainList = mainState[mainMap.id.toMainState[dataKey]]
    const dataItemId: string | string[] = activeDataItem[dataKey]
    const isMultiSelect = ['cardIds'].includes(dataKey)
    
    return <>
      <label>{mainMap.idToBuilt[dataKey]}</label>
      <select 
        className={dataItemId ? '' : 'disabled'}
        multiple={isMultiSelect}
        value={dataItemId || ''} 
        onChange={({target}) => {

          if(isMultiSelect){ 
            const selectedIds = Array.from(target.selectedOptions).map(o => o.value)
            setActiveDataItem({...activeDataItem, [dataKey]: selectedIds})
          } else {
            const value = target.value == 'Clear' ? null : target.value
            setActiveDataItem({...activeDataItem, [dataKey]: value})
          }
        }}
      >
        {!dataItemId ? 
          <option className='disabled' value={activeDataItem[dataKey]}>
            Select {mainMap.idToBuilt[dataKey]}
          </option> :
          <option className='disabled' value={null}>
            Clear
          </option>
        }
        {mainList.map(item => 
          <option 
            key={item.id} 
            value={item.id}
            className={is('selected').if(activeDataItem[dataKey] && activeDataItem[dataKey] == item.id)}
          >
            {item.name}
          </option>
        )}
      </select>
    </>
  }
})
