import { numberLoop, randomNumber } from "../../../helper-functions";
import { mainService } from "../../services/main.service";
import { mainState } from "../../state/main.state";
import Data from "./data.object.super";
import { Tile_Game } from "../tile.object";
import { gameService } from "../../services/game.service";
import { HoverCard } from "../../components/views/play/in-game/game";
import { Card } from "./card.object";
import {Subject} from 'rxjs';
import { Player } from "./player.object";
import { dataService } from "../../services/data.service";
import { Deck_Data } from "./deck.object";
import { Person, Person_Data } from "./person.object";



interface EventLog{
  soure
  effect
  
}

export type GameConfig = {
  rows: number
  columns: number
}

export type Tile = {
  column: number
  row: number
  cardOnTile?: GameCard
  playerId: string
}


export type GameCard = Card & {
  playerId
  currentHealth
  isBeingHovered: boolean
  dragCoords: {
    xPercent: number,
    yPercent: number
  },
  image: string
  
}

function createPlayer(person: Person): Player{
  const { startingBudget, startingMorale } = mainState.gameConfig

  const library: GameCard[] = person.activeDeck.cards.map(c => ({
    ...c, 
    playerId: person.id,
    currentHealth: c.hp,
    isBeingHovered: false,
    dragCoords: null
  }))

  const player = {
    ...person,
    hand: [],
    maxBudget: startingBudget,
    availableBudget: startingBudget,
    library,
    morale: startingMorale,
    graveyard: []
  }
  return player
}

export type CreateGameArgs = {   
  thisPerson: Person, 
  personOpponent?: Person,
  vsSelf?: boolean,
  vsAi?: boolean
}

export type Game_Data = {    
  id: null,
  tiles: Tile[],
  players: Player[],
  turnNumber: number,
  playersTurnId,
  draggedCards: GameCard[],
  focusCard: GameCard
}

export function createGame(
  {thisPerson, personOpponent, vsSelf, vsAi}: CreateGameArgs
): Game_Data{
  const {rowsPerPlayer, columns, startingCardsInHand} = mainState.gameConfig

  // create players
  const players: Player[] = [
    createPlayer(thisPerson),
    personOpponent ? 
      createPlayer(personOpponent) :
      createPlayer({
        id: vsAi && 'computer' || vsSelf && 'self',
        name: vsAi && 'computer' || vsSelf && 'self',
        activeDeck: thisPerson.activeDeck
      } as Person)

  ]

  // battle field tiles
  const tiles = (
    numberLoop(players.length, num =>
      numberLoop(rowsPerPlayer, row => 
        numberLoop(columns, (column): 
          Tile => ({
            column, 
            row, 
            playerId: players[num-1].id
          })
        )
      )
    )
  )

  // draw starting hand cards
  players.forEach(p =>
    p.hand = p.library.splice(0, startingCardsInHand)
  )

  // who goes first
  const fiftyFifty = !!randomNumber({from: 0, to: 1})
  const playersTurnId = fiftyFifty ? players[0].id : players[1].id

  const game = {
    id: null,
    tiles,
    players,
    turnNumber: 0,
    playersTurnId,
    draggedCards: [],
    focusCard: null
  }
  return game
}




/* 
export class Game_Service {
  
  cardDragDrop(hoverCard: HoverCard){
    const {card: {name}, mouseCoords:{x, y}, aboveTile} = hoverCard
    console.log(`card (${name}) dropped at: x${x}/y${y} `);
    this.hoverCard = null
    if(cardDropIsValid()){
      this.events.onCardDropped.next(hoverCard)
    }


  function cardDropIsValid(){
    return (
      tileIsPlayers() &&
      playerCanAffordIt() &&
      tileCanAcceptCard()
    )
    function tileIsPlayers(){
      const usersPlayerId = ''
      return aboveTile.playerId == usersPlayerId
    }
    function playerCanAffordIt(){
      return true
    }
    function tileCanAcceptCard(){
      return true
    }
  }

  cardDragStart(card: Card){
    this.hoverCard = {...this.hoverCard, card}
    this.hoveredCard = null
  }

  setMouseCoords(mouseCoords: {x: number, y: number}){
    this.hoverCard = {...this.hoverCard, mouseCoords}
  }

}

 */