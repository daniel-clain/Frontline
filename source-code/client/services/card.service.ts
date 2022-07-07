import { GameCard } from "../object-models/data-objects/game.object"
import { mainState } from "../state/main.state"
import { gameService } from "./game.service"



export const cardService = {
  getCardInHandProps
}

const {setHoveredCard, setDraggedCard, stopDrag, setFocusCard} = gameService

function getCardInHandProps(card: GameCard){
  
  const {userId} = mainState
  const {dragCoords, isBeingHovered, id, playerId} = card
  const {yPercent, xPercent} = dragCoords

  const dragBuffer = 500
  let dragBufferTimeout

  const cardProps = {
    key: id,
    className: `
      card-in-hand-wrapper 
      ${isBeingHovered ?
        'being-hovered' : ''}
      ${dragCoords != null ?
        'being-dragged' : ''}
      ${userId != playerId ?
        'back-of-card' : ''}
    `,
    style: !dragCoords ? {} : {
      position: 'relative',
      top: `${yPercent}%`,
      left: `${xPercent}%`
    },
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onMouseMove
  }
  return cardProps

  function onMouseEnter(){
    setHoveredCard(card)
  }

  function onMouseDown(){
    dragBufferTimeout = setTimeout(() => {
      setDraggedCard(card)
    }, dragBuffer)
  }
  function onMouseUp(){
    if(!dragCoords){
      clearTimeout(dragBufferTimeout)
      onClick()
    } else {
      stopDrag()
    }

  }

  

  function onMouseLeave(){
    console.log('leave');
  }

  function onMouseMove(e){
    console.log('e :>> ', e);
    if(dragCoords){
      console.log('has drag coords');
    }
  }

  function onClick(){
    setFocusCard(card)
  }
}

