import { randomNumber } from "../helper-functions"
import { Card_Object } from "../object-models/card.object"
import { Game_Data_Object, Game_Object } from "../object-models/game.object"
import { mainState } from "../state/main.state"
import { DraggedCard } from "../views/in-game/in-game.view"
import { dataService } from "./data.service"
import { mainService } from "./main.service"
import {Subject} from 'rxjs';



export const gameService = {
  startNewGame,
  readyForGame,
  cardDragDrop,
  cardDragStart,
  setMouseCoords,
  events: {
    onCardDropped: new Subject<DraggedCard>()
  }
}


function readyForGame(){
  startGame(mainState.user.uid)
}
function startGame(playerId: string) {
  const game = mainService.convertToDataObject<Game_Object, Game_Data_Object>(new Game_Object([playerId]))
  dataService.add<Game_Data_Object>('Games', game)
}

function startNewGame(gameId: string){
    
}

function cardDragDrop(draggedCard: DraggedCard){
  const {card: {name}, mouseCoords:{x, y}} = draggedCard
  console.log(`card (${name}) dropped at: x${x}/y${y} `);
  mainState.draggedCard = null

  gameService.events.onCardDropped.next(draggedCard)

}

function cardDragStart(card: Card_Object){
  mainState.draggedCard = {...mainState.draggedCard, card}
  mainState.hoveredCard = null
}

function setMouseCoords(mouseCoords: {x: number, y: number}){
  mainState.draggedCard = {...mainState.draggedCard, mouseCoords}
}

// impelementation

function getTileCardWasDroppedOn(){

}


