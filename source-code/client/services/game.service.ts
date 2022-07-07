import { randomNumber } from "../../helper-functions"
import { Card } from "../object-models/data-objects/card.object"
import { createGame, CreateGameArgs, GameCard, Game_Data, Tile } from "../object-models/data-objects/game.object"
import { mainState } from "../state/main.state"
import { HoverCard } from "../components/views/play/in-game/game"
import { dataService } from "./data.service"
import { mainService } from "./main.service"
import {Subject} from 'rxjs';
import { Person, Person_Data } from "../object-models/data-objects/person.object"
import { Player } from "../object-models/data-objects/player.object"


const {
  toPersonData,
  buildOutPerson
} = dataService




export const gameService = {
  waitForPvpGame,
  startGameVsAi,
  updateGame,
  endTurn,
  isMyTurn,
  setFocusCard,
  setHoveredCard,
  setDraggedCard,
  stopDrag,
  get thisPlayer(){
    return mainState.game.players.find(p => p.id == mainState.userId)
  },
  getPlayerTiles,
}

function getPlayerTiles(player: Player): Tile[]{
    return mainState.game.tiles.filter(t => t.playerId == player.id)
}

function stopDrag(){

}


function setDraggedCard(card: GameCard){

}


function setHoveredCard(card: GameCard){

}


function isMyTurn(){  
  const {game, userId} = mainState
  return game.playersTurnId == userId
}

function endTurn(){
  const {game} = mainState
  const {players, playersTurnId} = game
  const nextPlayer = players.find(p => p.id != playersTurnId)
  game.playersTurnId = nextPlayer.id
  updateGame(game)
}

function setFocusCard(card: GameCard){
  const {game,userId} = mainState
  game.players.find(p => p.id == userId)
  .hand.find(c => c.id = card.id)
  .isBeingHovered = true
  updateGame(game)
}

function waitForPvpGame(){

  const {thisPerson, people} = mainState

  if(!thisPerson.activeDeck){
    alert('must have a deck to have a game')
    return
  }

  const otherPersonQueuing = people.find(p => 
    p.id != thisPerson.id &&
    p.queuingForPvpGame
  )


  if(otherPersonQueuing){
    dataService.update('People', {
      ...otherPersonQueuing, queuingForPvpGame: false
    })
    const personOpponent = buildOutPerson(otherPersonQueuing)
    startGame({thisPerson, personOpponent})
  } else {    
    dataService.update('People', {
      ...toPersonData(thisPerson), queuingForPvpGame: true
    })
  }

}
function startGameVsSelf(){
  
  const {thisPerson} = mainState
  if(!thisPerson.activeDeck){
    alert('must have a deck to have a game')
    return
  }

  startGame({thisPerson, vsSelf: true})

  console.log('game vs ai started');
}

function startGameVsAi(){
  
  const {thisPerson} = mainState
  if(!thisPerson.activeDeck){
    alert('must have a deck to have a game')
    return
  }

  startGame({thisPerson, vsAi: true})

  console.log('game vs ai started');
}

function startGame(
  {thisPerson, personOpponent, vsSelf, vsAi}: CreateGameArgs
){
  dataService.add<Game_Data>('Games', 
    createGame({
      thisPerson, personOpponent, vsSelf, vsAi
    })
  )
}

function updateGame(game: Game_Data){
  dataService.update('Games', game)
}