import { randomNumber } from "../helper-functions";
import { mainService } from "../services/main.service";
import { mainState } from "../state/main.state";
import Data_Object from "./data.object.super";
import { Player_Game_Object } from "./player.object";

interface EventLog{
  soure
  effect
  
}

export class Game_Data_Object implements Data_Object {
  id
  gamePlayers: Player_Game_Object[]
  playersTurn?: string
  turnCount: number
  history?: EventLog[]
  computerPlayer?: Player_Game_Object

}

export class Game_Object {
  id
  gamePlayers: Player_Game_Object[] = []
  playersTurn?: string
  turnCount: number = 1
  history?: EventLog[] = []
  computerPlayer?: Player_Game_Object

  constructor(playerIds: string[]){
    const gameConfig = mainState.gameConfig[0]
    const needsComputerPlayer = playerIds.length == 1

    if(needsComputerPlayer){
      const library = mainService.deckIdToCards(mainState.decks[0].id)
      const hand = library.splice(0, gameConfig.startingCardsInHand)

      this.computerPlayer = {
        playerId: 'Computer',
        name: 'Computer',
        graveyard: [],
        hand,
        library,
        budget: gameConfig.startingBudget,
        maxBudget: gameConfig.startingBudget

      } 
    }


    playerIds.forEach(playerId => {
      const player = mainState.players.find(p => playerId)

      const library = mainService.deckIdToCards(player.activeDeckId)
      const hand = library.splice(0, gameConfig.startingCardsInHand)
      
      this.gamePlayers.push({
        name: player.name,
        playerId: player.id,
        graveyard: [],
        hand,
        library,
        budget: gameConfig.startingBudget,
        maxBudget: gameConfig.startingBudget
      })
    })

    const thisPlayer = this.gamePlayers.find(gamePlayer => {
      const matchingPlayer = mainState.players.find(player => player.id == gamePlayer.playerId)
      if(matchingPlayer.userId == mainState.user.uid){
        return true
      }
    })
    const enemy = this.gamePlayers.find(p => p.playerId != mainState.user.uid) || this.computerPlayer
    
    const fiftyFifty = !!randomNumber({from: 0, to: 1})
    this.playersTurn = fiftyFifty ? thisPlayer.playerId : enemy.playerId

  }
}

