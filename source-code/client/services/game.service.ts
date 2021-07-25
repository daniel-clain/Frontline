import { randomNumber } from "../helper-functions"
import { Card_Object } from "../object-models/card.object"
import { Game_Data_Object, Game_Object } from "../object-models/game.object"
import { mainState } from "../state/main.state"
import { DraggedCard } from "../views/in-game/in-game.view"
import { dataService } from "./data.service"
import { mainService } from "./main.service"



export const gameService = {
  startNewGame,
  readyForGame,
  cardDragDrop,
  cardDragStart,
  setMouseCoords
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
  console.log(`card dropped ${draggedCard.card.name}`);
  mainState.draggedCard = null
}

function cardDragStart(card: Card_Object){
  mainState.draggedCard = {...mainState.draggedCard, card}
  mainState.hoveredCard = null
}

function setMouseCoords(mouseCoords: {x: number, y: number}){
  mainState.draggedCard = {...mainState.draggedCard, mouseCoords}
}




