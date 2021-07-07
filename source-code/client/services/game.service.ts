import { randomNumber } from "../helper-functions"
import { Game_Data_Object } from "../object-models/game.object"
import { mainState } from "../state/main.state"
import { dataService } from "./data.service"

interface PlayerInGame_Object{
  
}


function readyForGame(){
  startGame(mainState.user.uid)
}
function startGame(playerId: string) {
  const fiftyFifty = randomNumber({from: 0, to: 1})
  dataService.add<Game_Data_Object>('Games', {
    playerIds: [playerId],    
    turnCount: 0,
    playersTurn: !!fiftyFifty
  } as Game_Data_Object)
}

const startNewGame = (gameId: string) => {
    
}

export const gameService = {
  startNewGame,
  readyForGame
}








