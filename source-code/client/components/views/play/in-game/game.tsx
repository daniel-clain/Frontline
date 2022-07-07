
import { observer } from 'mobx-react';
import * as React from 'react';
import { useEffect } from 'react';
import {mainState} from '../../../../state/main.state';
import { Player_C } from './player';
import { Card } from '../../../../object-models/data-objects/card.object';
import { FocusCard_C } from '../../../card.component';
import { Battlefield_C } from './battlefield';
import { Tile_Game } from '../../../../object-models/tile.object';

export type HoverCard = {
  card: Card
  coords: {
    xPercent: number,
    yPercent: number
  }
}

export const InGame_View = observer(() => {

  const {userId, game} = mainState
  if(!game) return <>Your are not in a game</>

  const {turnNumber, players, focusCard} = game


  

  const enemy = players.find(p => p.id != userId)
  const thisPlayer = players.find(p => p.id == userId)


  
  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove) 
    document.addEventListener('mouseup', onMouseUp)    
    function onMouseMove(e){
      const hoveredElem = e.target as HTMLElement
      const isTile = hoveredElem.hasAttribute('data-tile')
      const tileData: Tile_Game = isTile && JSON.parse(hoveredElem.dataset.tile)
      /* game.hoverCard = {
        ...hoverCard,
        aboveTile: tileData,
        mouseCoords: {x: e.x, y: e.y}
      } */
    }
    function onMouseUp(e){
      /* if(hoverCard){
        game.cardDragDrop(hoverCard)
      } */
    }
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  

  function endTurn(){
    
  }

  return (
    <game>
      turn: {turnNumber}
      <Player_C player={players[0]}/>
      <Player_C player={players[1]}/>
      <Battlefield_C/>

      <FocusCard_C card={focusCard}/>
    </game>
  )

})






