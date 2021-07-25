import * as React from 'react';
import { CSSProperties, useEffect, useState } from 'react';
import { is, numberLoop } from '../../helper-functions';
import { Card_Object } from '../../object-models/card.object';
import { Game_Data_Object, Game_Object } from '../../object-models/game.object';
import { Player_Game_Object } from '../../object-models/player.object';
import { Card_P } from '../../partials/card.partial';
import { dataService } from '../../services/data.service';
import { mainService } from '../../services/main.service';
import { mainState } from '../../state/main.state';
import budgetImage from '../../images/budget.png'
import { DraggedCard } from './in-game.view';
import { gameService } from '../../services/game.service';
import { observer } from 'mobx-react';

type Props = {
  player: Player_Game_Object
  onEndTurn: () => void
  isPlayersTurn: boolean
  isComputer: boolean
  game: Game_Object
}
export const Player_C = observer(({player: {playerId, name, hand, graveyard, library, budget, maxBudget}, onEndTurn, isPlayersTurn, isComputer, game}: Props) => {
  

  const usersPlayerId = mainState.players.find(p => p.userId == mainState.user.uid)!.id
  const isPlayer = playerId == usersPlayerId

  const {cardDragStart, cardDragDrop} = gameService
  const {draggedCard, hoveredCard} = mainState


  useEffect(() => {
    if(isPlayersTurn) doNewTurn()    
  }, [isPlayersTurn])


  function doNewTurn(){
    if(library.length)
      hand.push(library.shift())
    const gameConfigMaxBudget = Number(mainState.gameConfig[0].maxBudget)
    if(Number(maxBudget) < gameConfigMaxBudget)
      maxBudget++
    budget = maxBudget

    const gameDataObject = mainService.convertToDataObject<Game_Data_Object, Game_Object>(game)
    
    if(isComputer){
      gameDataObject.computerPlayer = {...gameDataObject.computerPlayer, hand, library, budget, maxBudget}
    } else {
      gameDataObject.gamePlayers = gameDataObject.gamePlayers.map(p => p.playerId != playerId ? p : {...p, hand, library, budget, maxBudget})
    }      

    dataService.update('Games', {...gameDataObject, turnCount: game.turnCount + 1})

  }

  function isDraggedPlayersCard(card: Card_Object){
    return draggedCard?.card?.id == card.id && isPlayer
  }
  function onHover(card){
    mainState.hoveredCard = card
  }

  const cardOnCursorStyle: CSSProperties = {position: 'absolute', top: draggedCard?.mouseCoords?.y, left: draggedCard?.mouseCoords?.x}

  return <div className={`player-container ${isPlayer ? 'this-player' : 'enemy'}`}>
    <div className="name">{name}</div>
    <div className="budget">{numberLoop(maxBudget, num => 
      <img key={num} src={budgetImage} className={`budget-image ${is('used').if(num > budget)}`} />
    )}</div>
    <div className="hand">
      {hand.map(card => 
        <div 
          className={`hand-card-wrapper ${is('being-dragged').if(isDraggedPlayersCard(card))}`} 
          onMouseEnter={() => isPlayer && onHover(card)} 
          onMouseLeave={() => onHover(null)} 
          onMouseDown={() => cardDragStart(card)}
          onMouseUp={() => cardDragDrop(draggedCard)}
          key={card.id} 
          style={isDraggedPlayersCard(card) ? cardOnCursorStyle : null}
        >
          <Card_P {...{card}}></Card_P>
        </div> 
      )}
    </div>
    <div className="graveyard">Graveyard: {graveyard.length}</div>
    <div className="library">Library: {library.length}</div>
    <div className="budget">Budget: {budget}</div>
    {is(
      <button onClick={onEndTurn}>End Turn</button>
    ).if(isPlayersTurn)}
  </div>

})
