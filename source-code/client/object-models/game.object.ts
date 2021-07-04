import Data_Object from "./data.object.super";
import { Player_Object } from "./player.object";

interface EventLog{
  soure
  effect
  
}

export interface Game_Object extends Data_Object {
  playerIds: string[]
  playersTurn?: string
  turnCount: number
  history?: EventLog[]

}

