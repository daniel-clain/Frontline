import { observer } from 'mobx-react';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { is } from '../../helper-functions';
import { Card_Object } from '../../object-models/card.object';
import { gameService } from '../../services/game.service';
import { mainService } from '../../services/main.service';
import { mainState } from '../../state/main.state';
import { DraggedCard } from './in-game.view';

type Props = {
  row: number
  column: number
}

export const Tile_C = observer(({row, column}: Props) => {

  const tileRef = useRef<HTMLDivElement>(null)
  const {draggedCard} = mainState

  const dragIsOverThisTile = draggedCard?.card && cardIsBeingDraggedAboveThisTile(draggedCard)

  const [cardsOnThisTile, setCardsOnThisTile] = useState([])

  useEffect(() => {
    const cardDropSubscription = gameService.events.onCardDropped.subscribe((draggedCard: DraggedCard) => {
      if(cardIsBeingDraggedAboveThisTile(draggedCard)){
        console.log('ding: ', draggedCard);
        setCardsOnThisTile([...cardsOnThisTile, draggedCard.card])
      }
    })

    return cardDropSubscription.unsubscribe


  }, [])

  function cardIsBeingDraggedAboveThisTile(draggedCard: DraggedCard){
    if(!(draggedCard?.mouseCoords)) return
    const {x, y} = draggedCard?.mouseCoords
    const {clientWidth, offsetLeft, offsetTop, clientHeight} = tileRef.current
    const mouseIsWithinBoundariesOfTile = (
      x > offsetLeft && x < offsetLeft + clientWidth &&
      y > offsetTop && y < offsetTop + clientHeight 
    )
    return mouseIsWithinBoundariesOfTile
  }


  return <>
    <div 
      className={`
        tile 
        ${is('is-open-for-drop').if(dragIsOverThisTile)}
      `}  
      ref={tileRef}
    >
      {cardsOnThisTile.map(card =>
        <div className='card-on-tile'>{card.name}</div>
      )}
    </div>
  </>
})