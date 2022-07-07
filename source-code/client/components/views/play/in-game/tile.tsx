import { observer } from 'mobx-react';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { is } from '../../../../../helper-functions';
import { Game_Data } from '../../../../object-models/data-objects/game.object';
import { Tile_Game } from '../../../../object-models/tile.object';
import { gameService } from '../../../../services/game.service';
import { mainService } from '../../../../services/main.service';
import { mainState } from '../../../../state/main.state';
import { HoverCard } from './game';

export const Tile_C = observer(({row, column, playerId}: Tile_Game) => {
  return <></>
/* 
  const tileRef = useRef<HTMLDivElement>(null)
  const {activeGame} = mainState
  
  

  const {hoverCard, events} = activeGame

  const dragIsOverThisTile = hoverCard?.card && cardIsBeingDraggedAboveThisTile(hoverCard)

  const [cardsOnThisTile, setCardsOnThisTile] = useState([])

  useEffect(() => {
    const cardDropSubscription = events.onCardDropped.subscribe((hoverCard: HoverCard) => {
      if(cardIsBeingDraggedAboveThisTile(hoverCard)){
        console.log('ding: ', hoverCard);
        setCardsOnThisTile([...cardsOnThisTile, hoverCard.card])
      }
    })

    return cardDropSubscription.unsubscribe


  }, [])

  function cardIsBeingDraggedAboveThisTile(hoverCard: HoverCard){
    const {aboveTile} = hoverCard
    if(
      aboveTile &&
      aboveTile.playerId == playerId &&
      aboveTile.row == row &&
      aboveTile.column == column
    ) return true
  }


  return <>
    <div 
      data-tile={JSON.stringify({row, column, playerId})}
      className={`
        tile 
        ${is('is-open-for-drop').if(dragIsOverThisTile)}
      `}  
      ref={tileRef}
    >
      {cardsOnThisTile.map(card =>
        <div key={card.name} className='card-on-tile'>{card.name}</div>
      )}
    </div>
  </> */
})