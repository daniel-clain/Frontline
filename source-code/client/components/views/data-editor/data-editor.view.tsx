
import { observer } from 'mobx-react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { dataService } from '../../../services/data.service';
import {mainState } from '../../../state/main.state'
import { is } from '../../../../helper-functions';
import { MainState } from '../../../object-models/main-state.object';
import Data from '../../../object-models/data-objects/data.object.super';
import { mainMap } from '../../../constants/objects-map';
import { collectionSet, Collection_Type } from '../../../sets/firebase-collections.set';
import { dataObjects } from '../../../constants/data-object-keys.constant';



function createEmptyObject<T extends Data>(type: keyof MainState): T{
  const singularKey = mainMap.mainState.toSingle[type]
  const object: T = dataObjects[singularKey]
  return object
 
}

export const DataEditor_View = observer(() => {

  const initialType: keyof MainState = 'cards'

  const [s, setState] = useState({
    activeDataType: initialType, 
    activeDataItem: pickActiveDataItem(initialType)
  })
  console.log('s.activeDataItem :>> ', s.activeDataItem);
  const dataList = mainState[s.activeDataType] as {id: string, name: string}[]
 
  return <>
    <div className='data-editor-view view'>
      
      <h1>Data Editor</h1>

      <select 
        className="data-type-selector"
        onChange={({target: {value}}) => setActiveDataType(value)}
      >
        {collectionSet
        .map((key: Collection_Type) => 
          <option 
            key={key}
            className={is('selected').if(s.activeDataItem?.[key] == key)}
            value={mainMap.collection.toMain[key]}
          >
            {key}
          </option>
        )}
      </select>

      <div className="list container has-border">
        
        {dataList?.map(dataItem => 
          <div 
            key={dataItem.id}
            onClick={_ => setState({...s, activeDataItem: (dataItem)})}
            className={is('selected').if(s.activeDataItem?.id == dataItem.id)}
          >
            {dataItem.name || dataItem.id}
          </div>
        )}
      </div>

      <div className="active-data-item">
        {getActiveDataItemFields()}
        {is(<>
          <button onClick={submitActiveDataItem}>
            {s.activeDataItem?.id ? 'Update' : isFixedData() ? '' : 'Add'}
          </button>
        
          <button onClick={deleteActiveDataItem}>
            {s.activeDataItem?.id ? 'Delete' : isFixedData() ? '' : 'Clear'}
          </button>
        </>).if(!isFixedData() || s.activeDataItem?.id)}

        {is(
          <button onClick={_ => setActiveDataItem()}>
            Unselect
          </button>
        ).if(!isFixedData() && s.activeDataItem?.id)}
      </div>
    </div>
  </>


  // implementation


  function setActiveDataType(type){
    setState({activeDataType: type, activeDataItem: pickActiveDataItem(type)})
  }
  function setActiveDataItem(item?){
    setState({...s, activeDataItem: item || pickActiveDataItem()})
  }

  function pickActiveDataItem(type?){
    return isFixedData(type) ?
    mainState[type || s.activeDataType]?.[0] :
    createEmptyObject(type || s.activeDataType)
  }

  function isFixedData(type?){
    return ['games', 'people', 'gameConfigs'].includes(type || s.activeDataType)
  }


  function getActiveDataItemFields(){
    return s.activeDataItem && Object.keys(createEmptyObject(s.activeDataType)).map((dataKey:any) => {

      const isSelectField = Object.keys(mainMap.id.toMainState).includes(dataKey)

      return (
        <div className="field" key={dataKey}>
          {isSelectField ? 
            getSelectField(dataKey) :
            getInputField(dataKey)
          }
        </div>
      )
    })
  }

  async function submitActiveDataItem(){
    
    const collectionString = mainMap.mainState.toCollection[s.activeDataType]

    s.activeDataItem?.id ?
      await dataService.update(collectionString, s.activeDataItem) :
      await dataService.add(collectionString, s.activeDataItem)  

    setActiveDataItem()
  }

  async function deleteActiveDataItem(){
    
    const collectionString = mainMap.mainState.toCollection[s.activeDataType]

    if(s.activeDataItem.id){
      await dataService.deleteData(collectionString, s.activeDataItem)
    }      

    setActiveDataItem()
  }

  function getInputField(dataKey: string){ 
    return <>
      <label>{mainMap.property.toLabel[dataKey] || dataKey}</label>
      <input 
        required
        value={
          is(s.activeDataItem?.[dataKey] || '').if(s.activeDataItem)
          
        }
        onChange={({target}) => 
          setActiveDataItem({...s.activeDataItem, [dataKey]: target.value })
        }
        onKeyUp={({code}: any) => code == 'Enter' &&  submitActiveDataItem()}
      />
    </>
  }

  function getSelectField(dataKey: string){ 
    const mainList = mainState[mainMap.id.toMainState[dataKey]]
    const dataItemId: string | string[] = s.activeDataItem[dataKey]
    const isMultiSelect = ['cardIds', 'deckIds', 'playerIds'].includes(dataKey)
    if(isMultiSelect){

      console.log('has multi');
      
    }
    return <>
      <label>{mainMap.id.toBuilt[dataKey]}</label>
      <select 
        className={dataItemId ? '' : 'disabled'}
        multiple={isMultiSelect}
        value={dataItemId || ''} 
        onChange={({target}) => {

          if(isMultiSelect){ 
            const selectedIds = Array.from(target.selectedOptions).map(o => o.value)
            setActiveDataItem({...s.activeDataItem, [dataKey]: selectedIds})
          } else {
            const value = target.value == 'Clear' ? null : target.value
            setActiveDataItem({...s.activeDataItem, [dataKey]: value})
          }
        }}
      >
        {!dataItemId ? 
          <option className='disabled' value={s.activeDataItem[dataKey]}>
            Select {mainMap.id.toBuilt[dataKey]}
          </option> :
          <option className='disabled' value={null}>
            Clear
          </option>
        }
        {mainList.map(item => 
          <option 
            key={item.id} 
            value={item.id}
            className={is('selected').if(s.activeDataItem[dataKey] && s.activeDataItem[dataKey] == item.id)}
          >
            {item.name}
          </option>
        )}
      </select>
    </>
  }
})
