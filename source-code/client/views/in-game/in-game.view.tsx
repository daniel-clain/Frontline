
import { observer } from 'mobx-react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { is, numberLoop } from '../../helper-functions';
import { Game_Data_Object, Game_Object } from '../../object-models/game.object';
import { mainService } from '../../services/main.service';
import {mainState} from '../../state/main.state';
import { Player_C } from './player';
import { Card_Object } from '../../object-models/card.object';
import { Card_P } from '../../partials/card.partial';
import { dataService } from '../../services/data.service';
import { isComputed } from 'mobx';
import { PlayerTiles_C } from './player-tiles';
import { gameService } from '../../services/game.service';

export type DraggedCard = {
  card: Card_Object,
  mouseCoords: {x: number, y: number}
}

const {buildOutDataObject} = mainService

export const InGame_View = observer(() => {

  const {user, games, hoveredCard} = mainState
  const usersPlayerId = mainState.players.find(p => p.userId == user.uid)!.id
  const usersGame: Game_Data_Object = games.find(g => g.gamePlayers.find(player => usersPlayerId == player.playerId))

  if(!usersGame) return <>Your are not in a game</>

  const game = buildOutDataObject<Game_Data_Object, Game_Object>(usersGame)
  const {turnCount, playersTurn, history, gamePlayers, computerPlayer} = game

  const {setMouseCoords} = gameService
  const {id, rowsPerPlayer,columns } = mainState.gameConfig[0]

  const enemy = usersGame.gamePlayers.find(player => player.playerId != usersPlayerId) || computerPlayer
  const thisPlayer = usersGame.gamePlayers.find(player => player.playerId == usersPlayerId)


  
  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove)    
    function onMouseMove({x, y}){
      setMouseCoords({x, y})
    }
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [])
  

  function endTurn(){
    const nextPlayer = usersGame.gamePlayers.find(player => player.playerId != playersTurn) || computerPlayer
    dataService.update('Games', {...usersGame, playersTurn: nextPlayer.playerId})
  }

  return <div className="view in-game-view">

    <div className="turn">Turn: {turnCount}</div>
    
    <Player_C {...{
      player: enemy, 
      onEndTurn: endTurn,
      isPlayersTurn: playersTurn == enemy.playerId,
      isComputer: !!computerPlayer,
      game

    }} />

    {is(
      <div className="hover-card-wrapper">
        <Card_P {...{card: hoveredCard}}></Card_P>
      </div>
    ).if(hoveredCard)}

    <div className="game-board">
      <div className="enemyTiles">
        <PlayerTiles_C {...{rowsPerPlayer, columns, player: enemy}}/>
      </div>

      <div className="thisPlayerTiles">
        <PlayerTiles_C {...{rowsPerPlayer, columns, player: thisPlayer}}/>
      </div>
    </div>
    
    <Player_C {...{
      player: thisPlayer, 
      onEndTurn: endTurn,
      isPlayersTurn: playersTurn == thisPlayer.playerId,
      isComputer: false,
      game
    }} />

  </div>

})






