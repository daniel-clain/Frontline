import { observer } from 'mobx-react';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { is } from '../../helper-functions';
import { mainState } from '../../state/main.state';
import { DraggedCard } from './in-game.view';

type Props = {
  row: number
  column: number
}

export const Tile_C = observer(({row, column}: Props) => {

  const tileRef = useRef<HTMLDivElement>(null)
  const {draggedCard} = mainState

  const dragIsOverThisTile = draggedCard?.card && cardIsBeingDraggedAboveThisTile()

  const [thingsOnThisTile, setThingsOnThisTile] = useState([])

  function cardIsBeingDraggedAboveThisTile(){
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
      <div className="tile-inner"></div>
    </div>
  </>
})