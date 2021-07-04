import { observable } from "mobx";
import { mainMap } from "../map";
import { Card_Object } from "../object-models/card.object";
import Data_Object from "../object-models/data.object.super";
import { Game_Object } from "../object-models/game.object";
import { Player_Object } from "../object-models/player.object";
import { collectionSet } from "../sets/firebase-collections.set";
import { mainState } from "../state/main.state";
import { DataService } from "./data.service";
import { UserService } from "./user.service";

export const MainService = {
  ...DataService,
  ...UserService,
  readyForGame
}
collectionSet.forEach(collection => {
  DataService.data$(collection, (dataItem: Data_Object[]) => {
    mainState[mainMap.collection.toMain[collection]] = dataItem
  })
})


function readyForGame(){
  const otherPlayer = mainState.players.find(p => p.id != thisPlayerId)
  const thisPlayerId = UserService.user.uid
  if(otherPlayer){
    startGame(otherPlayer.id, thisPlayerId)
  }
}
function startGame(otherPlayerId: string, thisPlayerId: string) {
  DataService.add('Games', {playerIds: [otherPlayerId, thisPlayerId]} as Game_Object)

}

